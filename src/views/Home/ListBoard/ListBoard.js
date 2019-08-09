import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as color from '../../../components/assets/color';
import { Link } from 'react-router-dom'
import './ListBoard.scss'
import axios from '../../../axios/axios'
import withLinnerProgressBar from '../../../components/LinnerProgressBar/withLinnerProgressBar';
import TextInput from '../../../components/TextInput/TextInput'

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    subBar: {
        background: color.color_bg_black40,
        boxShadow: 'none'
    },
    columnWrap: {
        display: 'inline-block',
    },
    column: {
        backgroundColor: color.color_bg_white90,
        height: theme.spacing(20),
        width: theme.spacing(30),
        borderRadius: theme.spacing(1),
    }
}))

function ListBoard(props) {
    const classes = useStyle();
    const { userId } = props;

    const [listBoard, setListBoard] = useState([
    ])

    useEffect(() => {
        async function fetchData() {
            if (userId !== undefined)
                axios.get(`/user/${userId}/projects`)
                    .then(res => {
                        setListBoard(res.data)
                    }).catch(error => {

                    })
        }
        fetchData()
    }, [userId])

    const handleAddNewProject = (name) => {
        axios.post(
            "/project",
            {
                userId,
                name
            }
        ).then( res => {
            setListBoard([...listBoard, res.data])
        }).catch( error =>{
            
        })
    }

    const renderProject = (project) => (
        <Link
            className='board-detail'
            id={project.id}
            key={project.id}
            to={{
                pathname: `/home/board/${project.id}`,
                state: {
                    ...project
                }
            }}
            
        >
            <div className='name'>
                {project.name}
            </div>
            <div className='description'>
                {project.description}
            </div>

        </Link>
    )
    return (
        <div className={classes.root}>
            <div className='list-board'>
                {listBoard.map(e => renderProject(e))}
                <TextInput
                    holderText='Create new project'
                    variant='horizontal'
                    inputPlaceHolderText="Enter project's name"
                    onAdd={handleAddNewProject}
                />
            </div>
        </div >
    )
}

export default withLinnerProgressBar(ListBoard)

