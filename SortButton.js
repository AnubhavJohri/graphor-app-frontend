import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { FormGroup, MMInputText, Error, MMSortList } from "./styles/LeadListFilterForm.styled";
import { ListBox } from 'primereact/listbox';
// import listTemplate from './LeadListSortTemplate';

const SortButton = props => {
    const [displayLeadStatus, setdisplayLeadStatus] = useState(false);
    const [sortParameter,setsortParameter] = useState('');
    const sortOptions =[
        {label:'Select',order:'',value:''},
        {label:'Name',order:'A-Z',value:'name'},
        {label:'Purchase Time',order:'Recent First',value:'purchasetime'},
        {label:'Recent Interaction',order:'Recent First',value:'recentinteraction'},
        {label:'Order Amount',order:'Greater First',value:'orderamount'},
    ]
    const listTemplate = (option) =>{
        return (
            <div className="p-clearfix" onClick={()=>displayLeadStatus ? setdisplayLeadStatus(false) : setdisplayLeadStatus(true)}>
                <span style={{fontSize:'12px',float:'left',margin:'1em .5em 0 0'}}>{option.label}</span>
                <span style={{fontSize:'12px',float:'right',margin:'1em .5em 0 0'}}><b>{option.order}</b></span>
            </div>
        );
    }
    const handleSortDropDownChange = (e) =>{
        setsortParameter(e.target.value);
        console.log('value=',e.target.value);
    }
    return (
        <React.Fragment>
            <FormGroup>
                {sortParameter}
                <Button
                    label="Sort"
                    icon="pi pi-check"
                    iconPos="right"
                    className="p-button-danger"
                    type='button'
                    onClick={() => displayLeadStatus ? setdisplayLeadStatus(false) : setdisplayLeadStatus(true)} />
                {(displayLeadStatus) ? (
                    <MMSortList
                        id='sortParameter'
                        name='sortParameter'
                        value={sortParameter}
                        options={sortOptions}
                        onChange={handleSortDropDownChange}
                        itemTemplate={listTemplate}
                        optionLabel="label"
                        optionValue="value"
                        onClick={(e) => console.log('event=', e)}
                    />):null}
            </FormGroup>
        </React.Fragment>
    );
}

export default SortButton ;