import { TableCell, TableRow } from "semantic-ui-react";
import { ARKUSZ, DOWNLOAD, GODLO, NAME, NAZWA, PODTYP, TYP, YEAR } from "../app/constants/Rasters";

export default function TableRowItem({ feature, isSelected, handleSelect }) {
    return (
        <TableRow onClick={handleSelect} active={isSelected}>
            <TableCell>{feature.get(YEAR)}</TableCell>
            <TableCell>{feature.get(GODLO)}</TableCell>
            <TableCell>{feature.get(NAME)}</TableCell>
            <TableCell>{feature.get(TYP)}</TableCell>
            <TableCell>{feature.get(PODTYP)}</TableCell>
            <TableCell>{feature.get(ARKUSZ)}</TableCell>
            <TableCell>{feature.get(NAZWA)}</TableCell>
            <TableCell><a href={feature.get(DOWNLOAD)}>{feature.get(DOWNLOAD).split('/').at(-1)}</a></TableCell>
        </TableRow>
    )
}