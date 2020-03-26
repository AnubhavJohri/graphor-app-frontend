import styled,{css} from 'styled-components' ;
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";

export const FormGroup = styled.div`
padding:8px
`

export const MMInputText = styled(InputText)`
&.p-inputtext{
    width:100%
}
`
export const Error = styled.p`
color:red;
font-size:12px;
`
export const MMSortList = styled(ListBox)`
&.p-listbox {
    padding: 0;
    min-width: 12em;
    background: #ffffff;
    border: 1px solid #a6a6a6;
    width: 250px;
}
`

export const MMSortListItem = styled.div`
padding:1px;
height:auto
`
