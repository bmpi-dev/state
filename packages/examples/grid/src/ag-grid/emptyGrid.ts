import { JSONSchema7 } from 'json-schema'
import { range } from 'ramda'

const rowCollectionKey = '::rows'

export const emptyGrid = (rowCount: number, colCount: number = rowCount) => {
  const rows = range(0, rowCount).map(i => `row_${i + 1}`)
  const cols = range(0, colCount).map(i => `col_${i + 1}`)

  const rowReducer = (rowMap: { [id: string]: any }, id: string) => ({
    ...rowMap,
    [id]: { id },
  })
  const rowIndexReducer = (rowIndex: { [id: string]: boolean }, id: string) => ({
    ...rowIndex,
    [id]: true,
  })
  const columnReducer = (colMap: JSONSchema7['properties'], id: string, i: number) => ({
    ...colMap,
    [id]: { description: `Field ${i + 1}` },
  })

  return {
    ...rows.reduce(rowReducer, {}),
    [rowCollectionKey]: rows.reduce(rowIndexReducer, {}),
    schema: { properties: cols.reduce(columnReducer, {}) },
  }
}