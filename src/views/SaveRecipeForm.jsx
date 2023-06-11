import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addNewRecipe, getRecipeById} from '../store/actions/recipes/recipes-action';
import {Box, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Header from "../components/header/Header";
import NumberCircle from "../components/NumberCircle";
import {clearIngredients, getIngredientsByName} from "../store/actions/ingredients/ingredients-action";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {clearTags, getTagsByName} from "../store/actions/tags/tags-action";
import {useHistory, useLocation} from "react-router-dom";
import {Modal} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '66%',
        margin: 'auto',
    },
    field: {
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
        backgroundColor: 'white',
    },
    stepNumber: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    stepContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    stepDescription: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },
}));

function stepReducer(state, action) {
    switch (action.type) {
        case 'ADD_STEP':
            return [...state, {stepNumber: state.length + 1, stepDescription: ''}];
        case 'REMOVE_STEP':
            return state.filter((_, index) => index !== action.index);
        case 'UPDATE_STEP':
            return state.map((step, index) =>
                index === action.index ? {...step, stepDescription: action.value} : step
            );
        case 'LOAD_STEPS':
            return action.steps;
        default:
            return state;
    }
}


function ingredientReducer(state, action) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return [...state, {id: null, name: ''}];
        case 'REMOVE_INGREDIENT':
            return state.filter((_, index) => index !== action.index);
        case 'UPDATE_INGREDIENT':
            return state.map((ingredient, index) =>
                index === action.index ? {...ingredient, id: action.value.id, name: action.value.name} : ingredient
            );
        case 'LOAD_INGREDIENTS':
            return action.ingredients;
        default:
            return state;
    }
}

function tagReducer(state, action) {
    switch (action.type) {
        case 'ADD_TAG':
            return [...state, {id: null, name: ''}];
        case 'REMOVE_TAG':
            return state.filter((_, index) => index !== action.index);
        case 'UPDATE_TAG':
            return state.map((tag, index) =>
                index === action.index ? {...tag, id: action.value.id, name: action.value.name} : tag
            );
        case 'LOAD_TAGS':
            return action.tags;
        default:
            return state;
    }
}


const SaveRecipeForm = () => {
    const location = useLocation();
    const recipeId = location.state ? location.state.recipeId : null;
    const classes = useStyles();
    const currentRecipe = useSelector((state) => state.recipes.currentRecipe);
    const dispatch = useDispatch();
    const ingredientsByName = useSelector((state) => state.ingredients.ingredientsByName);


    useEffect(() => {
        if (recipeId) {
            dispatch(getRecipeById(recipeId));
        }
    }, [dispatch, recipeId]);

    useEffect(() => {
        if (currentRecipe) {
            setRecipe(currentRecipe);

            const sortedSteps = [...currentRecipe.recipeStepList].sort((a, b) => a.stepNumber - b.stepNumber);
            dispatchSteps({
                type: 'LOAD_STEPS', steps: sortedSteps.map((step, index) => ({
                    ...step,
                    id: step.id || null,
                    recipeID: currentRecipe.id || null,
                    stepNumber: index + 1
                }))
            });

            dispatchIngredients({type: 'LOAD_INGREDIENTS', ingredients: currentRecipe.ingredients});
            dispatchTags({type: 'LOAD_TAGS', tags: currentRecipe.tags});


        } else {
            setRecipe({
                id: '',
                name: '',
                minutes: '',
                submitted: '',
                description: '',
                recipeStepList: [
                    {
                        stepNumber: '',
                        stepDescription: '',
                    }
                ],
                nutrition: {
                    calories: '0',
                    fat: '0',
                    saturatedFat: '0',
                    carbohydrates: '0',
                    fiber: '0',
                    protein: '0',
                    sodium: '0',
                },
                ingredients: [
                    {
                        id: '',
                        name: '',
                    }
                ],
                tags: [
                    {
                        id: '',
                        name: '',
                    }
                ]
            });
            dispatchSteps({type: 'LOAD_STEPS', steps: [{stepNumber: 1, stepDescription: ''}]});
            dispatchIngredients({type: 'LOAD_INGREDIENTS', ingredients: [{name: ''}]});
            dispatchTags({type: 'LOAD_TAGS', tags: [{name: ''}]});
        }
    }, [currentRecipe]);


    const [recipe, setRecipe] = useState({
        id: '',
        name: '',
        minutes: '',
        submitted: '',
        description: '',
        recipeStepList: [
            {
                stepNumber: '',
                stepDescription: '',
            }
        ],
        nutrition: {
            calories: '0',
            fat: '0',
            saturatedFat: '0',
            carbohydrates: '0',
            fiber: '0',
            protein: '0',
            sodium: '0',
        },
        ingredients: [
            {
                id: '',
                name: '',
            }
        ],
        tags: [
            {
                id: '',
                name: '',
            }
        ]
    });

    const [steps, dispatchSteps] = useReducer(stepReducer, [
        {stepNumber: 1, stepDescription: ''},
    ]);
    const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, [
        {name: ''},
    ]);
    const [tags, dispatchTags] = useReducer(tagReducer, [
        {name: ''},
    ]);

    const addStep = () => {
        dispatchSteps({type: 'ADD_STEP'});
    };

    const updateStep = (index) => (event) => {
        dispatchSteps({type: 'UPDATE_STEP', index, value: event.target.value});
    };

    const removeStep = (index) => () => {
        dispatchSteps({type: 'REMOVE_STEP', index});
    };

    const addIngredient = () => {
        dispatchIngredients({type: 'ADD_INGREDIENT'});
    };

    const updateIngredient = (index) => (event, newValue) => {
        if (newValue) {
            dispatchIngredients({type: 'UPDATE_INGREDIENT', index, value: newValue});
        } else {
            dispatchIngredients({type: 'UPDATE_INGREDIENT', index, value: {id: null, name: ''}});
        }
        setIngredientSearch('');  // Clear the search text
    };


    const removeIngredient = (index) => () => {
        dispatchIngredients({type: 'REMOVE_INGREDIENT', index});
    };


    const addTag = () => {
        dispatchTags({type: 'ADD_TAG'});
    };

    const updateTag = (index) => (event, newValue) => {
        if (newValue) {
            dispatchTags({type: 'UPDATE_TAG', index, value: newValue});
        } else {
            dispatchTags({type: 'UPDATE_TAG', index, value: {id: null, name: ''}});
        }
        setTagSearch('');  // Clear the search text
    };


    const removeTag = (index) => () => {
        dispatchTags({type: 'REMOVE_TAG', index});
    };
    const history = useHistory();



    const [ingredientSearch, setIngredientSearch] = useState('');
    const [tagSearch, setTagSearch] = useState('');

    const tagsByName = useSelector((state) => state.tags.tagsByName);
    useEffect(() => {
        if (ingredientSearch) {
            dispatch(getIngredientsByName(ingredientSearch));
        }

        return () => {
            dispatch(clearIngredients());
        };
    }, [ingredientSearch, dispatch]);


    useEffect(() => {
        if (tagSearch) {
            dispatch(getTagsByName(tagSearch));
        }

        return () => {
            dispatch(clearTags());
        };
    }, [tagSearch, dispatch]);


    const isIngredientDuplicate = (newIngredient) => {
        return ingredients.some(ingredient => ingredient.name === newIngredient.name);
    }

    const isTagDuplicate = (newTag) => {
        return tags.some(tag => tag.name === newTag.name);
    }
    const [minutesError, setMinutesError] = useState('');
    const handleMinutesChange = (event) => {
        const userInput = event.target.value;
        if (!/^[0-9]*$/.test(userInput)) {
            setMinutesError('Only digits');
        } else if (userInput.length > 4) {
            setMinutesError('Maximum 4 digits');
        } else {
            setMinutesError('');
            setRecipe({...recipe, minutes: userInput});
        }
    };
    const areRequiredFieldsFilled = () => {
        if (recipe.name === '' || recipe.minutes === '' || steps.some(step => step.stepDescription === '') || ingredients.some(ingredient => ingredient.name === '') || tags.some(tag => tag.name === '') || recipe.minutes === '') {
            return false;
        }
        return true;
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [forumEvent,setForumEvent] = useState(null);

    const handleConfirm = () => {

        forumEvent.preventDefault();
        if (!areRequiredFieldsFilled()) {
            alert('Toate câmpurile obligatorii trebuie completate!');
            return;
        }

        const finalRecipe = {...recipe, recipeStepList: steps, ingredients: ingredients, tags: tags};
        // console.log(finalRecipe.recipeStepList)
        dispatch(addNewRecipe(finalRecipe)).then(() => {

            history.push("/my-recipes", {
                recipeId: recipeId,
            });
        }).catch((error) => {
            console.error("A apărut o eroare în timpul adăugării rețetei", error);
        });
        handleClose();
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setForumEvent(event);
        handleShow();
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure that you want to continue with this action?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Header/>
            <Box component="form" className={classes.root} onSubmit={handleSubmit}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Typography variant="h6">Basics</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                label="Recipe Name"
                                variant="outlined"
                                value={recipe.name}
                                onChange={(event) => setRecipe({...recipe, name: event.target.value})}
                                error={recipe.name === ''}
                                helperText={recipe.name === '' ? 'Recipe name cannot be empty.' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                label="Minutes"
                                variant="outlined"
                                value={recipe.minutes}
                                onChange={handleMinutesChange}
                                error={minutesError !== '' || recipe.minutes === ''}
                                onBlur={() => setMinutesError('')}
                                helperText={recipe.minutes === '' ? 'Minutes cannot be empty.' : minutesError}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.field}
                                label="Description"
                                variant="outlined"
                                value={recipe.description}
                                onChange={(event) => setRecipe({...recipe, description: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Nutrition</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Calories"
                                variant="outlined"
                                value={recipe.nutrition.calories}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, calories: event.target.value}
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Fat"
                                variant="outlined"
                                value={recipe.nutrition.fat}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, fat: event.target.value}
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Saturated Fat"
                                variant="outlined"
                                value={recipe.nutrition.saturatedFat}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, saturatedFat: event.target.value}
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Carbohydrates"
                                variant="outlined"
                                value={recipe.nutrition.carbohydrates}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, carbohydrates: event.target.value}
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Fiber"
                                variant="outlined"
                                value={recipe.nutrition.fiber}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, fiber: event.target.value}
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Protein"
                                variant="outlined"
                                value={recipe.nutrition.protein}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, protein: event.target.value}
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.field}
                                label="Sodium"
                                variant="outlined"
                                value={recipe.nutrition.sodium}
                                onChange={(event) => setRecipe({
                                    ...recipe,
                                    nutrition: {...recipe.nutrition, sodium: event.target.value}
                                })}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant="h6">Steps</Typography>
                        </Grid>
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} className={classes.stepContainer}>
                                    <NumberCircle number={index + 1}/>
                                    <TextField
                                        className={`${classes.field} ${classes.stepDescription}`}
                                        label="Step Description"
                                        variant="outlined"
                                        value={step.stepDescription}
                                        onChange={updateStep(index)}
                                        error={step.stepDescription === ''}
                                        helperText={step.stepDescription === '' ? 'Step description cannot be empty.' : ''}
                                    />
                                    {index === steps.length - 1 && (
                                        <React.Fragment>
                                            <Button onClick={addStep}>+</Button>
                                        </React.Fragment>
                                    )}
                                    {index > 0 && (
                                        <Button onClick={removeStep(index)}>-</Button>
                                    )}
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Typography variant="h6">Ingredients</Typography>
                        </Grid>
                        {ingredients.map((ingredient, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} className={classes.stepContainer}>
                                    <Autocomplete
                                        options={Array.isArray(ingredientsByName) ? ingredientsByName : []}
                                        getOptionLabel={(option) => option.name}
                                        getOptionDisabled={(option) => isIngredientDuplicate(option)}
                                        style={{width: 300}}
                                        onInputChange={(event, newValue) => {
                                            setIngredientSearch(newValue);
                                        }}
                                        onChange={(event, newValue) => {
                                            setIngredientSearch(newValue ? newValue.name : "");
                                            updateIngredient(index)(event, newValue);
                                        }}
                                        value={ingredient}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Ingredient"
                                                variant="outlined"
                                                error={ingredient.name === ''}
                                            />
                                        }
                                    />


                                    {index === ingredients.length - 1 && (
                                        <React.Fragment>
                                            <Button onClick={addIngredient}>+</Button>
                                        </React.Fragment>
                                    )}
                                    {ingredients.length > 1 && (
                                        <Button onClick={removeIngredient(index)}>-</Button>
                                    )}

                                </Grid>
                            </React.Fragment>
                        ))}


                        <Grid item xs={12}>
                            <Typography variant="h6">Tags</Typography>
                        </Grid>
                        {tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} className={classes.stepContainer}>
                                    <Autocomplete
                                        options={Array.isArray(tagsByName) ? tagsByName : []}
                                        getOptionLabel={(option) => option.name}
                                        getOptionDisabled={(option) => isTagDuplicate(option)}
                                        style={{width: 300}}
                                        onInputChange={(event, newValue) => {
                                            setTagSearch(newValue);
                                        }}
                                        onChange={updateTag(index)}
                                        value={tag} // add this line
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Tag"
                                                variant="outlined"
                                                error={tag.name === ''}
                                            />
                                        }
                                    />

                                    {index === tags.length - 1 && (
                                        <React.Fragment>
                                            <Button onClick={addTag}>+</Button>
                                        </React.Fragment>
                                    )}
                                    {tags.length > 1 && (
                                        <Button onClick={removeTag(index)}>-</Button>
                                )}

                            </Grid>
                            </React.Fragment>
                            ))}


                        <Grid item xs={12}>
                            {!areRequiredFieldsFilled() && (
                                <p style={{color: 'red'}}>Please fill in all required fields.</p>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!areRequiredFieldsFilled()}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <button type="button" className="btn btn-secondary ml-2"
                                    onClick={() => history.goBack()}>Undo</button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    );
};

export default SaveRecipeForm;