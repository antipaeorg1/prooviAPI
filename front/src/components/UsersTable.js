import {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const UsersTable = () => {
    const [data, setData] = useState([]);
    const authToken = sessionStorage.getItem('accessToken');
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState('null');

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/users',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.users);
                setData(response.data.users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleDelete(userEmail) {
        setUserToDelete(userEmail)
        setDeleteDialogOpen(true);
    }

    function handleDeleteConfirm() {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/users/delete/${userToDelete}`,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0NEBtb2R1dWxvLmNvbSIsInVzZXJQYXNzd29yZCI6IiQyYiQxMCRySjN6LklLTS5aWFgvV3ZsendDVnplLzRkQ3R0ODh5Sm9WcnF3LkFCMFh4WGpVL1Z6dXpwSyIsImF1dGhlbnRpY2F0ZWQiOnRydWUsImlhdCI6MTY5ODg1NTE2MX0.Sl3Ng0RhDPBAbH2POSImU-Eh3IqdUhlqdxwrmVwOwTA'
            }
        };

        axios.request(config)
            .then((response) => {
                window.location.reload();
                console.log(JSON.stringify(response.data));

            })
            .catch((error) => {
                console.log(error);
            });
        setDeleteDialogOpen(false);
    }


    const columns = useMemo(() => [
        {
            accessorKey: 'firstName', // access nested data with dot notation
            header: 'First Name',
            size: 150,
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
            size: 150,
        },
        {
            accessorKey: 'userEmail',
            header: 'Email',
            size: 150,
        }
    ], []);

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowActions: true,
        renderRowActions: ({row}) => (
            <Box>
                <IconButton onClick={() => handleDelete(row.original.userEmail)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        ),
    });

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        sx={{
                            fontSize: '1em',
                            width: '200px',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            borderColor: 'black',
                            color: 'black'
                        }}
                        variant="outlined"
                        color="primary"
                        startIcon={<PersonAddIcon style={{ fontSize: '2rem' }}/>}
                    >
                        Add New User
                    </Button>
                </div>
            </div>

            <MaterialReactTable table={table}/>
            <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete {userToDelete}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UsersTable;
