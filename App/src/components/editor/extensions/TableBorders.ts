// import { Command } from '@tiptap/core';
// import { TableMap, findTable, selectionCell } from '@tiptap/pm/tables';
// import { Extension } from '@tiptap/core';

// type Side = 'Top' | 'Bottom' | 'Left' | 'Right';

// declare module '@tiptap/core' {
//     interface Commands<ReturnType> {
//         tableBorders: {
//             setTableBorderAttribute: (side: Side, value: string) => ReturnType;
//         };
//     }
// }

// export default Extension.create({
//     name: 'tableBorders',
//     addCommands() {
//         return {
//             setTableBorderAttribute:
//                 (side: Side, value: string): Command =>
//                 ({ state, tr, dispatch }) => {
//                     const tableInfo = findTable(state.selection.$head);
//                     const cellInfo = selectionCell(state);
//                     if (!tableInfo || !cellInfo) {
//                         return false;
//                     }

//                     const { node: tableNode, start: tableStart } = tableInfo;
//                     const map = TableMap.get(tableNode);

//                     const rel = cellInfo.pos - tableStart;
//                     const rect = map.findCell(rel);

//                     const setSide = (pos: number, s: Side) => {
//                         const node = tr.doc.nodeAt(pos);
//                         if (!node) {
//                             return;
//                         }
//                         tr.setNodeMarkup(pos, undefined, { ...node.attrs, [`border${s}`]: value });
//                     };

//                     // current cell
//                     const curPos = tableStart + map.positionAt(rect.top, rect.left, tableNode);
//                     setSide(curPos, side);

//                     // opposite side on touching neighbors
//                     const opposite: Side =
//                         side === 'Top' ? 'Bottom' : side === 'Bottom' ? 'Top' : side === 'Left' ? 'Right' : 'Left';

//                     if (side === 'Left' || side === 'Right') {
//                         const neighCol = side === 'Right' ? rect.right : rect.left - 1;
//                         if (neighCol >= 0 && neighCol < map.width) {
//                             for (let r = rect.top; r < rect.bottom; r++) {
//                                 const nPos = tableStart + map.positionAt(r, neighCol, tableNode);
//                                 setSide(nPos, opposite);
//                             }
//                         }
//                     } else {
//                         const neighRow = side === 'Bottom' ? rect.bottom : rect.top - 1;
//                         if (neighRow >= 0 && neighRow < map.height) {
//                             for (let c = rect.left; c < rect.right; c++) {
//                                 const nPos = tableStart + map.positionAt(neighRow, c, tableNode);
//                                 setSide(nPos, opposite);
//                             }
//                         }
//                     }

//                     if (dispatch) {
//                         dispatch(tr);
//                     }
//                     return true;
//                 },
//         };
//     },
// });

import { Extension, Command } from '@tiptap/core';
import { TableMap, findTable, selectionCell, CellSelection, selectedRect } from '@tiptap/pm/tables';

type Side = 'Top' | 'Bottom' | 'Left' | 'Right';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        tableBorders: {
            setTableBorderAttribute: (attributeName: string, side: Side, value: string) => ReturnType;
        };
    }
}

export default Extension.create({
    name: 'tableBorders',

    addCommands() {
        return {
            setTableBorderAttribute:
                (attributeName: string, side: Side, value: string): Command =>
                ({ state, tr, dispatch }) => {
                    // 1) Locate table (public API)
                    const tableInfo = findTable(state.selection.$head);
                    if (!tableInfo) {
                        return false;
                    }

                    const { node: tableNode, start: tableStart } = tableInfo;
                    const map = TableMap.get(tableNode);

                    // 2) Collect all unique cell positions (absolute) to affect
                    const cellAbsPosSet = new Set<number>();

                    if (state.selection instanceof CellSelection) {
                        // Rectangular selection (may include merged cells)
                        const rect = selectedRect(state);
                        for (let r = rect.top; r < rect.bottom; r++) {
                            for (let c = rect.left; c < rect.right; c++) {
                                const relPos = map.positionAt(r, c, tableNode); // relative to tableStart
                                const absPos = tableStart + relPos;
                                cellAbsPosSet.add(absPos); // duplicates (from merged cells) collapse automatically
                            }
                        }
                    } else {
                        // Single cell selection / text cursor inside a cell
                        const cellInfo = selectionCell(state);
                        if (!cellInfo) {
                            return false;
                        }
                        const rel = cellInfo.pos - tableStart;
                        const rect = map.findCell(rel);
                        const relPos = map.positionAt(rect.top, rect.left, tableNode);
                        const absPos = tableStart + relPos;
                        cellAbsPosSet.add(absPos);
                    }

                    // Helper to set one side on a given absolute cell position
                    const setSide = (absPos: number, s: Side) => {
                        const node = tr.doc.nodeAt(absPos);
                        if (!node) {
                            return;
                        }
                        tr.setNodeMarkup(absPos, undefined, { ...node.attrs, [attributeName + s]: value });
                    };

                    const opposite: Side =
                        side === 'Top' ? 'Bottom' : side === 'Bottom' ? 'Top' : side === 'Left' ? 'Right' : 'Left';

                    // 3) For each unique cell: set its side, then neighbors touching that edge (first-degree only)
                    for (const absPos of cellAbsPosSet) {
                        const relPos = absPos - tableStart;
                        const rect = map.findCell(relPos);

                        // current cell
                        setSide(absPos, side);

                        // neighbors touching the chosen edge
                        if (side === 'Left' || side === 'Right') {
                            const neighCol = side === 'Right' ? rect.right : rect.left - 1;
                            if (neighCol >= 0 && neighCol < map.width) {
                                for (let r = rect.top; r < rect.bottom; r++) {
                                    const nRel = map.positionAt(r, neighCol, tableNode);
                                    const nAbs = tableStart + nRel;
                                    setSide(nAbs, opposite);
                                }
                            }
                        } else {
                            const neighRow = side === 'Bottom' ? rect.bottom : rect.top - 1;
                            if (neighRow >= 0 && neighRow < map.height) {
                                for (let c = rect.left; c < rect.right; c++) {
                                    const nRel = map.positionAt(neighRow, c, tableNode);
                                    const nAbs = tableStart + nRel;
                                    setSide(nAbs, opposite);
                                }
                            }
                        }
                    }

                    if (dispatch) {
                        dispatch(tr);
                    }
                    return true;
                },
        };
    },
});
