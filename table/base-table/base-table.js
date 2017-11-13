import React from 'react';
import PropTypes from 'prop-types';
import { CellMeasurer, CellMeasurerCache, MultiGrid } from 'react-virtualized';
import sortBy from 'lodash.sortby';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import SortableHeader from '../sortable-header';
import Cell from '../cell';
import styles from './base-table.mod.css';

export default class BaseTable extends React.Component {
  static displayName = 'BaseTable';
  static propTypes = {
    /* an array of objects describing the tables columns */
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        /* The unique key of the columns that is used to identify your data. */
        key: PropTypes.string.isRequired,
        /* The horizontal alignment of the table column content */
        align: PropTypes.oneOf(['left', 'center', 'right']),
        /* The label of the column that will be shown in the column header. */
        label: PropTypes.node,
        /** Escape-hatch you can use when you have a more sophisticated or custom
         * header that doesn't follow the standard table header styling—like
         * different padding or background color.
         * Should implement the following interface: (): node
         */
        getLabel: PropTypes.func,
        /**
         * Indicates whether the column should be fixed and stick to the left side
         * so that only the other columns are horizontally scrollable.
         */
        isFixed: PropTypes.bool,
        /**
         * Whether clicking on the column header will sort the column.
         * Will call the onSortChange callback and respond to sortBy and
         * sortDirection changes.
         * Only the column whose key is equal to sortBy will be shown as sorted,
         * which means that the table only supports single column sorting.
         */
        isSortable: PropTypes.bool,
        /**
         * The grow factor relative to other columns. Basically, take any
         * available extra width and distribute it proportionally according to all
         * columns' flexGrow values.
         * This is also useful, when you want some columns to stick to their
         * width (like a column with actions or checkboxes) and some other columns
         * to take up the rest of the width.
         */
        flexGrow: PropTypes.number,
        /**
         * Custom class that is added to the header's cell container.
         */
        headerClassName: PropTypes.string,
        /**
         * Custom class that is added to the cell's container.
         */
        className: PropTypes.string,
        /**
         * Function to return a custom class that is added to the cell's
         * container.
         */
        classNameGetter: PropTypes.func,
        /**
         * Function that is called when the user clicks a cell in this column.
         * Only use this if you want to have a column specific behaviour. Most
         * of the times you will probably use onRowClick instead.
         * For styling the cell on :hover or :active use the className prop.
         * Should implement the following interface:
         * ({ rowIndex: number, columnKey: number }): void
         */
        onClick: PropTypes.func,
      })
    ).isRequired,
    itemRenderer: PropTypes.func.isRequired,
    registerMeasurementCache: PropTypes.func,
    rowCount: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    maxHeight: PropTypes.number.isRequired,
    maxWidth: PropTypes.number.isRequired,
    onSortChange: PropTypes.func,
    onRowClick: PropTypes.func,
    sortDirection: PropTypes.oneOf(['ASC', 'DESC']),
    sortBy: PropTypes.string,
    tableClassName: PropTypes.string,
  };

  // The table might not need to take up the full height/width it has
  // avaliable. To find out how much space it actually needs to take up, we need
  // to calculate the inner height/width of the table. This is done in the
  // handleSectionRendered function. That function is called by the MultiGrid
  // component AFTER it has rendered. To then update the table with the proper
  // height and width we need to store those in the state rather than on the
  // component instance.
  state = {
    height: this.props.maxHeight,
    width: this.props.maxWidth,
  };

  cellMeasurerCache = new CellMeasurerCache({
    defaultWidth: 400,
    defaultHeight: 100,
  });

  // fixed columns are rendered at the beginning of the table by convention
  columns = sortBy(this.props.columns, col => !col.isFixed);

  componentDidMount() {
    if (this.props.registerMeasurementCache) {
      this.props.registerMeasurementCache(this.cellMeasurerCache);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.columns = sortBy(nextProps.columns, col => !col.isFixed);
    }
    if (
      nextProps.maxWidth !== this.props.maxWidth ||
      nextProps.maxHeight !== this.props.maxHeight
    ) {
      // whenever the surroundings of the table change (mostly during rendering)
      // the available space for the table might change as well. E.g. there
      // might be a scrollbar now that wasn't there before. So we need to ensure
      // to reflect that in the table. Otherwise the table might be scrollable
      // all of a sudden.
      this.updateMeasurements({
        maxHeight: nextProps.maxHeight,
        maxWidth: nextProps.maxWidth,
      });
    }
    if (
      nextProps.sortBy !== this.props.sortBy ||
      nextProps.sortDirection !== this.props.sortDirection
    ) {
      // since the order of the rows has probably changed we need to re-
      // apply the cell sizes
      this.multiGrid.recomputeGridSize();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
      // check if the colums definition changed on runtime
      // this is normally only necessary when playing around with the table
      // in the storybook
      // why do we wait until the udpate is complete? Because
      // handleSectionRendered relies on the cell measurements from the cache,
      // which are done during the rendering. So the measurements are only
      // updated after the table has rerendered.
      this.updateMeasurements({
        maxHeight: this.props.maxHeight,
        maxWidth: this.props.maxWidth,
      });
    }
  }
  registerMultiGrid = node => {
    this.multiGrid = node;
  };
  updateMeasurements = ({ maxWidth, maxHeight }) => {
    this.handleSectionRendered({
      measurementCache: this.cellMeasurerCache,
      containerWidth: maxWidth,
      containerHeight: maxHeight,
    });
    this.multiGrid.recomputeGridSize();
  };
  // since this table also considers the header a row we need to subtract it
  // from the row index before passing it to the parent
  getBodyRowIndex = rowIndex => rowIndex - 1;
  handleChangeSortDirection = columnKey => {
    if (columnKey !== this.props.sortBy) {
      this.props.onSortChange(columnKey, 'ASC');
    } else {
      this.props.onSortChange(
        columnKey,
        this.props.sortDirection === 'ASC' ? 'DESC' : 'ASC'
      );
    }
  };
  calcTableContentHeight = ({ measurementCache, containerHeight }) => {
    let tableContentHeight = 0;
    for (let i = 0; i <= this.props.rowCount; i += 1) {
      tableContentHeight += measurementCache.rowHeight({
        index: i,
      });
      if (tableContentHeight > containerHeight) {
        break;
      }
    }
    return tableContentHeight;
  };
  calcTableContentWidth = ({ measurementCache, containerWidth }) => {
    let tableContentWidth = 0;
    for (let i = 0; i < this.props.columns.length; i += 1) {
      tableContentWidth += measurementCache.columnWidth({
        index: i,
      });
      if (tableContentWidth > containerWidth) {
        break;
      }
    }
    return tableContentWidth;
  };
  handleSectionRendered = ({
    measurementCache = this.cellMeasurerCache,
    containerWidth = this.props.maxWidth,
    containerHeight = this.props.maxHeight,
  }) => {
    // find out whether there is more vertical space than we can fill up with
    // rows
    const tableContentHeight = this.calcTableContentHeight({
      measurementCache,
      containerHeight,
    });
    // TODO use from nextProps as well
    const isVerticallyScrollable = tableContentHeight > containerHeight;

    // find out whether there is more horizontal space than we can fill up with
    // columns
    const tableContentWidth = this.calcTableContentWidth({
      measurementCache,
      containerWidth,
    });
    const isHorizontallyScrollable = tableContentWidth > containerWidth;

    if (!isVerticallyScrollable) {
      // in case the the table is not scrollable - meaning there indeed is more
      // horizontal space then rows to fill it up with - set the height to the
      // exact height of all rows so there is no white space left below the table
      const horizontalScrollBarWidth = isHorizontallyScrollable
        ? getScrollbarSize()
        : 0;
      this.setState({ height: tableContentHeight + horizontalScrollBarWidth });
    } else if (this.state.height !== containerHeight) {
      // reset the height to the max height because rows were added that now do
      // fill up the max height
      this.setState({ height: containerHeight });
    }

    const verticalScrollBarWidth = isVerticallyScrollable
      ? getScrollbarSize()
      : 0;
    const remainingWidth =
      containerWidth - tableContentWidth - verticalScrollBarWidth;
    if (remainingWidth > 0) {
      // when the content of the table is smaller than the available width
      // we can distribute the remaining space among columns that have
      // specified flexGrow.
      // if there are none, the table shouldn't take up the full width
      const shouldFillHorizontalSpace = this.props.columns.some(
        col => col.flexGrow
      );
      if (shouldFillHorizontalSpace) {
        this.setState({
          width: containerWidth,
          // calculate the remaining width to be able to evenly distribute
          // it among the flex grow columns
          remainingWidth,
        });
      } else {
        // TODO we should clarify if we actually need this mode or if we should
        // always fill up the remaining horizontal space

        // make the table exactly as wide as its contents
        this.setState({
          width: tableContentWidth + verticalScrollBarWidth,
          remainingWidth: undefined,
        });
      }
    } else {
      // reset the width to the full width in case columns were added that now
      // do fill up the max width
      this.setState({
        width: containerWidth,
        remainingWidth: undefined,
      });
    }
  };
  getColumnWidth = getColumnWidthFromCache => ({ index }) => {
    const numberOfFlexColumns = this.columns.filter(col => col.flexGrow).length;
    const shouldFillHorizontalSpace =
      this.state.remainingWidth && this.columns[index].flexGrow;
    if (shouldFillHorizontalSpace) {
      const widthPerFlexColumn =
        this.state.remainingWidth / numberOfFlexColumns;
      return getColumnWidthFromCache({ index }) + widthPerFlexColumn;
    }
    // in case the column is fixed we limit the width of that column to 400 in
    // order to prevent a fixed column from overflowing the overall width of
    // the table, which would result in the user not being able to see any
    // of the non-fixed scrollable columns. This is not perfect but gets us most
    // of the way there because most users don't have many fixed columns.
    return this.columns[index].isFixed
      ? Math.min(getColumnWidthFromCache({ index }), 400)
      : getColumnWidthFromCache({ index });
  };
  headerRenderer = column =>
    column.getLabel ? (
      column.getLabel()
    ) : (
      <Cell>
        <Spacings.InsetSquish scale="m">
          {column.isSortable ? (
            <div onClick={() => this.handleChangeSortDirection(column.key)}>
              <SortableHeader
                columnKey={column.key}
                sortBy={this.props.sortBy}
                sortDirection={this.props.sortDirection}
              >
                {column.label}
              </SortableHeader>
            </div>
          ) : (
            column.label
          )}
        </Spacings.InsetSquish>
      </Cell>
    );

  itemRenderer = renderParams => {
    // `column` is the original column-definition from where you defined the table
    // `renderParams` holds similar looking-information but is the data provided by "react-virtualized"
    const column = this.columns[renderParams.columnIndex];
    return (
      <CellMeasurer
        cache={this.cellMeasurerCache}
        columnIndex={renderParams.columnIndex}
        key={renderParams.key}
        parent={renderParams.parent}
        rowIndex={renderParams.rowIndex}
      >
        {renderParams.rowIndex === 0 ? (
          <div
            style={renderParams.style}
            className={classnames(
              styles['header-cell'],
              column.headerClassName,
              styles[`align-${column.align || 'left'}`]
            )}
          >
            {this.headerRenderer(column)}
          </div>
        ) : (
          <div
            // TODO: move the className and handlers into Cell
            style={renderParams.style}
            className={classnames(
              styles[`align-${column.align || 'left'}`],
              {
                [styles['hovered-row']]:
                  renderParams.rowIndex === this.state.hoveredRowIndex &&
                  renderParams.rowIndex !== 0 &&
                  this.props.onRowClick,
              },
              column.className,
              column.classNameGetter
                ? column.classNameGetter({
                    rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                    columnKey: column.key,
                    height: renderParams.height,
                    width: renderParams.width,
                  })
                : undefined
            )}
            data-test={`cell-${renderParams.rowIndex}-${column.key}`}
            onClick={event => {
              if (column.onClick) {
                column.onClick({
                  event,
                  rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                  columnKey: column.key,
                });
              } else if (this.props.onRowClick)
                this.props.onRowClick(
                  event,
                  this.getBodyRowIndex(renderParams.rowIndex)
                );
            }}
            onMouseOver={
              this.props.onRowClick
                ? () => {
                    this.setState({
                      hoveredRowIndex: renderParams.rowIndex,
                    });
                  }
                : null
            }
            onMouseOut={
              this.props.onRowClick
                ? () => {
                    this.setState({
                      hoveredRowIndex: undefined,
                    });
                  }
                : null
            }
          >
            <Cell>
              {renderParams.rowIndex === 0 ? (
                this.headerRenderer(column)
              ) : (
                <Spacings.Inset scale="m">
                  {this.props.itemRenderer({
                    ...renderParams,
                    rowIndex: this.getBodyRowIndex(renderParams.rowIndex),
                    columnKey: column.key,
                  })}
                </Spacings.Inset>
              )}
            </Cell>
          </div>
        )}
      </CellMeasurer>
    );
  };
  render() {
    return (
      <div
        className={classnames(styles.wrapper, this.props.tableClassName)}
        style={{ width: this.state.width }}
      >
        <MultiGrid
          ref={this.registerMultiGrid}
          classNameTopLeftGrid={styles['fixed-static']}
          classNameBottomLeftGrid={styles['fixed-column']}
          classNameBottomRightGrid={styles['table-body']}
          className={styles.table}
          deferredMeasurementCache={this.cellMeasurerCache}
          fixedColumnCount={
            this.props.columns.filter(col => col.isFixed).length
          }
          fixedRowCount={1}
          cellRenderer={this.itemRenderer}
          columnWidth={this.getColumnWidth(this.cellMeasurerCache.columnWidth)}
          columnCount={this.props.columns.length}
          height={this.state.height}
          rowHeight={this.cellMeasurerCache.rowHeight}
          rowCount={this.props.rowCount + 1}
          width={this.state.width}
          // The three props below are only passed down in order to make the component rerender
          hoveredRowIndex={this.state.hoveredRowIndex}
          items={this.props.items}
          cols={this.props.columns}
          onSectionRendered={this.handleSectionRendered}
        />
      </div>
    );
  }
}
