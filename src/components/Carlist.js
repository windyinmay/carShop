import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import AddCar from './AddCar';
import EditCar from './EditCar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Carlist() {
    const[cars, setCars] = useState([]);
    const[open, setOpen] = useState(false);
    const[msg, setMsg]= useState([]);

    const openSnackbar = () => {
        setOpen(true);
    }
    const closeSnackbar = () => {
        setOpen(false);
    }
 
    useEffect(()=> {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (url) => {
        if(window.confirm('Are you sure?')) {
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if(response.ok) {
                openSnackbar();
                setMsg('Car deleted');
                fetchCars();
            }
            else
                alert('Something went wrong!');
        })
        .catch(err => console.error(err))
        }
    }

    const saveCar = ( newCar ) => {
        fetch('https://carstockrest.herokuapp.com/cars', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCar)

            })
            .then(response => {
                if(response.ok) {
                    openSnackbar();
                    setMsg('Car added');
                    fetchCars();
                }
                else
                    alert('Something went wrong!');
            })
            .catch(err => console.error(err))
    }

    const editCar = ( url, updatedCar ) => {
        fetch(url, 
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCar)

            })
            .then(response => {
                if(response.ok) {
                    openSnackbar();
                    setMsg('Car edited');
                    fetchCars();
                }
                else
                    alert('Something went wrong in update!');
            })
            .catch(err => console.error(err))
    }

    const columns = [
        {field: 'brand', sortable: true, filter: true, width: 180},
        {field: 'model', sortable: true, filter: true, width: 180},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true, width: 100},
        {field: 'price', sortable: true, filter: true, width: 100},
        {
            headerName: '',
            width: 100,
            field: '_links.self.href',
            cellRendererFramework: params => <EditCar editCar={editCar} link={params.value} car={params.data}/>
        },
        {
            headerName: '',
            width: 100,
            field: '_links.self.href',
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={ () => deleteCar(params.value)}>
                <DeleteIcon variant= "outlined" color="secondary"/>
            </IconButton>
        }
    ];

    return(
        <div className="ag-theme-material" style={{ height: 800, width: '90%', margin: 'auto'}}>
            <AddCar saveCar={saveCar}/>
            <AgGridReact
            rowData={cars}
            columnDefs={columns}
            animateRows = {true}
            pagination = {true}
            paginationPageSize = {15}
            suppressCellSelection = {true}
            />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                message={msg}
                onClose={closeSnackbar}
            />
        </div>
    )
}

export default Carlist;