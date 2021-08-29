import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { UseStore } from "../../../app/stores/store";


export default observer(function ActivityFilters(){
    const {activityStore: {predicate, setPredicate}} = UseStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='All Cases' 
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="My Liked Cases" 
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <Menu.Item 
                    content="My Cases" 
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')}    
                />
            </Menu>
            <Header />
            <Calendar 
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>
    )
})