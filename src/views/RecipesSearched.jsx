import React, {useEffect, useReducer, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getRecipesSearched
} from "../store/actions/recipes/recipes-action";
import RecipeCard from "../components/cards/RecipeCard";
import Header from "../components/header/Header";
import Spinner from "react-bootstrap/Spinner";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {
    clearIngredients,
    getIngredientById,
    getIngredientsByName
} from "../store/actions/ingredients/ingredients-action";
import {
    SEARCHED_INGREDIENTS
} from "../store/actions/ingredients/ingredients-types";
import {SEARCHED_TAGS} from "../store/actions/tags/tags-types";
import {clearTags, getTagById, getTagsByName} from "../store/actions/tags/tags-action";
import {SEARCHED_CURRENT_PAGE, SEARCHED_LOADING} from "../store/actions/recipes/recipes-types";
import ReactPaginate from "react-paginate";
import "./RecipesSearched.css"
import {IconButton} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer'
import styled from 'styled-components';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

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

function ingredientReducer(state, action) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return [...state, {id: null, name: ''}];
        case 'ADD_SPECIFIC_INGREDIENT':
            const exists = state.some(ingredient => ingredient.id === action.value.id);
            if (!exists) {
                return [...state, {id: action.value.id, name: action.value.name}];
            }
            return state;
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
        case 'ADD_SPECIFIC_TAG':
            const exists = state.some(tag => tag.id === action.value.id);
            if (!exists) {
                return [...state, {id: action.value.id, name: action.value.name}];
            }
            return state;
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

const StyledButton = styled(IconButton)`
  color: white;

  &.active {
    background-color: red;
  }
`;

const RecipesSearched = () => {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const ingredientById = useSelector((state) => state.ingredients.ingredientById);
    const tagById = useSelector((state) => state.tags.tagById);
    const searchedRecipes = useSelector((state) => state.recipes.recipesSearchedPage);
    const totalElements = useSelector((state) => state.recipes.totalSearchedElements);
    const totalPages = useSelector((state) => state.recipes.totalSearchedPages);
    const ingredientsByName = useSelector((state) => state.ingredients.ingredientsByName);
    const tagsByName = useSelector((state) => state.tags.tagsByName);
    const filter = useSelector((state) => state.recipes.recipeFilter);
    const searchedLoading = useSelector((state) => state.recipes.searchedLoading);
    const searchedCurrentPage = useSelector((state) => state.recipes.searchedCurrentPage);
    const searched_number_of_elements_on_current_page = useSelector((state) => state.recipes.searched_number_of_elements_on_current_page);
    const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, [
        {name: ''},
    ]);
    const [tags, dispatchTags] = useReducer(tagReducer, [
        {name: ''},
    ]);
    const [ingredientSearch, setIngredientSearch] = useState('');
    const [tagSearch, setTagSearch] = useState('');
    const [sortType, setSortType] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [minMinutes, setMinMinutes] = useState(0);
    const [maxMinutes, setMaxMinutes] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);


    const [activeSortButton, setActiveSortButton] = useState('');
    const [activeTimeButton, setActiveTimeButton] = useState('');


    const handleSortClick = (sortType, sortOrder) => {
        updateQueryParams({sort: sortType, order: sortOrder});
        setActiveSortButton(sortType + sortOrder);
    };

    const handleTimeClick = (minMinutes, maxMinutes) => {
        updateQueryParams({minMinutes, maxMinutes});
        setActiveTimeButton(minMinutes + '-' + maxMinutes);
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

    const isIngredientDuplicate = (newIngredient) => {
        return ingredients.some(ingredient => ingredient.name === newIngredient.name);
    }

    useEffect(() => {
        if (ingredientSearch) {
            dispatch(getIngredientsByName(ingredientSearch));
        }

        return () => {
            dispatch(clearIngredients());
        };
    }, [ingredientSearch, dispatch]);


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

    const isTagDuplicate = (newTag) => {
        return tags.some(tag => tag.name === newTag.name);
    }

    useEffect(() => {
        if (tagSearch) {
            dispatch(getTagsByName(tagSearch));
        }

        return () => {
            dispatch(clearTags());
        };
    }, [tagSearch, dispatch]);


    const queryParams = new URLSearchParams(location.search);

    const updateQueryParams = (params) => {
        const {sort, order, minMinutes, maxMinutes} = params;

        const queryParams = new URLSearchParams(location.search);

        if (sort != null && order != null) {
            queryParams.delete("sort")
            queryParams.set("sort", sort)
            queryParams.delete("order")
            queryParams.set("order", order)
            queryParams.delete("page")
            queryParams.delete("size")
        }

        if (minMinutes != null && maxMinutes != null) {
            queryParams.delete("minMinutes")
            queryParams.set("minMinutes", minMinutes)
            queryParams.delete("maxMinutes")
            queryParams.set("maxMinutes", maxMinutes)
            queryParams.delete("page")
            queryParams.delete("size")
        }

        history.push(`/search?${queryParams.toString()}`);
    };

    useEffect(() => {
        dispatch({type: SEARCHED_INGREDIENTS, payload: ingredients});
        console.log("ingredients recipesSerached " + ingredients)
    }, [ingredients])

    useEffect(() => {
        dispatch({type: SEARCHED_TAGS, payload: tags});
        console.log("tags recipesSerached " + tags)
        if (tags && tags.length > 0)
            tags.forEach((tag) => {
                console.log("afisate taguri" + tag.id + " " + tag.name)
            })

    }, [tags])


    useEffect(() => {
        dispatch({type: SEARCHED_CURRENT_PAGE, payload: currentPage});
    }, [currentPage])


    useEffect(() => {
        if (queryParams && queryParams.toString() !== filter) {

            dispatchIngredients({type: 'LOAD_INGREDIENTS', ingredients: []});
            dispatchTags({type: 'LOAD_TAGS', tags: []});

            if (queryParams.get("ingredient")) {
                const ingredientIds = queryParams.get("ingredient").split(",");
                ingredientIds.forEach((id) => {
                    const parsedId = parseInt(id.trim(), 10);
                    if (!isNaN(parsedId) && Number.isInteger(parsedId)) {
                        dispatch(getIngredientById(parsedId));
                    }
                })
            } else {
                addIngredient()
            }
            if (queryParams.get("tag")) {
                const tagIds = queryParams.get("tag").split(",");
                tagIds.forEach((id) => {
                    const parsedId = parseInt(id.trim(), 10);
                    if (!isNaN(parsedId) && Number.isInteger(parsedId)) {
                        dispatch(getTagById(parsedId));
                    }
                })
            } else {
                addTag()
            }
            if (queryParams.get("sort") && queryParams.get("order")) {
                setActiveSortButton(queryParams.get("sort") + queryParams.get("order"));
            } else {
                setActiveSortButton('');
            }

            if (queryParams.get("minMinutes") && queryParams.get("maxMinutes")) {
                setActiveTimeButton(
                    queryParams.get("minMinutes") + '-' + queryParams.get("maxMinutes")
                );
            } else {
                setActiveTimeButton('');
            }

            setCurrentPage(queryParams.get("page"));
            dispatch({type: SEARCHED_LOADING, payload: true});
            dispatch(getRecipesSearched(queryParams.toString()));
        }
    }, [queryParams]);


    useEffect(() => {
        if (ingredientById) {
            console.log("useEffect ingredientById" + ingredientById.id + " " + ingredientById.name);
            dispatchIngredients({type: 'ADD_SPECIFIC_INGREDIENT', value: ingredientById});
        }
    }, [ingredientById, dispatchIngredients]);


    useEffect(() => {
        if (tagById) {
            console.log("useEffect tagById" + tagById.id + " " + tagById.name);
            dispatchTags({type: 'ADD_SPECIFIC_TAG', value: tagById});
        }
    }, [tagById, dispatchTags]);


    const handlePageClick = (e) => {
        queryParams.delete("page");
        queryParams.set("page", e.selected)
        history.push(`/search?${queryParams.toString()}`);
    };


    useEffect(() => {
        if (searched_number_of_elements_on_current_page != null && searched_number_of_elements_on_current_page === 0 && totalPages) {
            queryParams.delete("page");
            queryParams.set("page", totalPages - 1)
            history.push(`/search?${queryParams.toString()}`);
        }
    }, [searched_number_of_elements_on_current_page]);


    return (
        <div className="searched-recipes">
            <Header/>
            <div
                className="container py-5 h-100 d-flex justify-content-center align-items-center flex-column text-white text-center">
                <div className="sort-buttons">
                    <StyledButton
                        className={activeSortButton === 'nameasc' ? "active" : ""}
                        onClick={() => handleSortClick('name', 'asc')}
                    >
                        <TextFieldsIcon/>
                        <ArrowUpwardIcon/>
                    </StyledButton>
                    <StyledButton
                        className={activeSortButton === 'namedesc' ? "active" : ""}
                        onClick={() => handleSortClick('name', 'desc')}
                    >
                        <TextFieldsIcon/>
                        <ArrowDownwardIcon/>
                    </StyledButton>
                    <StyledButton
                        className={activeSortButton === 'submittedasc' ? "active" : ""}
                        onClick={() => handleSortClick('submitted', 'asc')}
                    >
                        <EventNoteIcon/>
                        <ArrowUpwardIcon/>
                    </StyledButton>
                    <StyledButton
                        className={activeSortButton === 'submitteddesc' ? "active" : ""}
                        onClick={() => handleSortClick('submitted', 'desc')}
                    >
                        <EventNoteIcon/>
                        <ArrowDownwardIcon/>
                    </StyledButton>
                </div>
                <div className="time-buttons">
                    <StyledButton
                        className={activeTimeButton === '0-30' ? "active" : ""}
                        onClick={() => handleTimeClick(0, 30)}
                    >
                        <TimerIcon/> <span> {"< 30 mins"}</span>
                    </StyledButton>
                    <StyledButton
                        className={activeTimeButton === '30-60' ? "active" : ""}
                        onClick={() => handleTimeClick(30, 60)}
                    >
                        <TimerIcon/> <span>30 - 60 mins</span>
                    </StyledButton>
                    <StyledButton
                        className={activeTimeButton === '60-120' ? "active" : ""}
                        onClick={() => handleTimeClick(60, 120)}
                    >
                        <TimerIcon/> <span>60 - 120 mins</span>
                    </StyledButton>
                    <StyledButton
                        className={activeTimeButton === '120-99999' ? "active" : ""}
                        onClick={() => handleTimeClick(120, 99999)}
                    >
                        <TimerIcon/> <span>> 120 mins</span>
                    </StyledButton>
                </div>
                <div>
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


                </div>


                <div
                    className="container py-5 h-100 d-flex justify-content-center align-items-center flex-column text-white text-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                {searchedLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : searchedRecipes && searchedRecipes.length > 0 ? (
                                    <div>
                                        <div>
                                            <ReactPaginate
                                                previousLabel={"prev"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={totalPages}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}
                                                forcePage={searchedCurrentPage}
                                            />
                                        </div>
                                        <p>No. recipes : {totalElements}</p>
                                        <div className="row">
                                            {searchedRecipes.map((recipe, index) => (
                                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
                                                    {recipe.id ? (
                                                        <>
                                                            <RecipeCard recipe={recipe} showOptions={false}
                                                                        optionsFromRecipeCard={false}/>
                                                        </>
                                                    ) : (
                                                        <RecipeCard emptyCard={true}/>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <ReactPaginate
                                                previousLabel={"prev"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={totalPages}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}
                                                forcePage={searchedCurrentPage}
                                            />
                                        </div>
                                    </div>
                                ) : searched_number_of_elements_on_current_page === 0 ? (
                                    <p>No recipe found with this specification</p>
                                ) : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipesSearched;
