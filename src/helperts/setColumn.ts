import { useWindowSize } from "@react-hook/window-size";

export const classColumn = (colum: string) => {
    const [width, height] = useWindowSize();
    let data = colum.split(' ');
    let result = {
        gridColumn: `${1}/ ${12 + 1}`,
        gridRow: 'auto',
    }
    if (width) {
        data.map(cadena => {
            let col = cadena.substring(0, cadena.indexOf("-"));
            let cadena2 = cadena.substring(cadena.indexOf("-") + 1, cadena.length);
            let colStart = parseInt(cadena2.substring(0, cadena2.indexOf("-")));
            let colEnd = parseInt(cadena2.substring(cadena2.indexOf("-") + 1, cadena2.length));
            if (col === 'col' && width < 576) {
                result = {
                    gridColumn: `${colStart}/ ${colEnd + 1}`,
                    gridRow: 'auto',
                }
            }
            if (col === 'sm' && width >= 576) {
                result = {
                    gridColumn: `${colStart}/ ${colEnd + 1}`,
                    gridRow: 'auto',
                }
            }
            if (col === 'md' && width >= 768) {
                result = {
                    gridColumn: `${colStart}/ ${colEnd + 1}`,
                    gridRow: 'auto',
                }
            }
            if (col === 'lg' && width >= 992) {
                result = {
                    gridColumn: `${colStart}/ ${colEnd + 1}`,
                    gridRow: 'auto',
                }
            }
            if (col === 'xl' && width >= 1200) {
                result = {
                    gridColumn: `${colStart}/ ${colEnd + 1}`,
                    gridRow: 'auto',
                }
            }
        })
    }
    return result
}



export const setColumnRow = (colStart: number, colEnd: number, rowStar?: number, rowEnd?: number) => {
    const divStyle = {
        gridColumn: `${colStart}/ ${colEnd + 1}`,
        gridRow: `${rowStar && rowEnd ? `${rowStar}/${rowEnd + 1}` : 'auto'}`,
        background: '#3690f7d6'
    }
    return divStyle;
}
