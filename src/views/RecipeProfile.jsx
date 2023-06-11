import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {
    addNewRecipe,
    clearRecipesDetails, getRecipeById,
} from "../store/actions/recipes/recipes-action";
import Header from "../components/header/Header";
import Rating from "../components/Rating";
import UserInfo from '../components/user/UserInfo';
import RecipeOptions from "../components/cards/RecipeOptions";
import {CLEAR_INTERACTION, EDIT_INTERACTION, SAVE_INTERACTION} from "../store/actions/interactions/interactions-types";
import InteractionOptions from "../components/cards/InteractionOptions";
import {
    deleteInteractionById,
    editInteraction,
    saveInteraction
} from "../store/actions/interactions/interactions-action";
import {Button, Modal} from "react-bootstrap";
import Timer from "../components/cards/Timer";

const RecipeDetails = (props) => {
    const [showsDispatched, setShowsDispatched] = useState(false);
    const [averageRating, setAverageRating] = useState(0.0);
    const [currentUserInteraction, setCurrentUserInteraction] = useState(null);
    const [interactions, setInteractions] = useState([]);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    const headerHeight = 80; // Set the actual height of your header here

    const dispatch = useDispatch();
    const currentRecipe = useSelector((state) => state.recipes.currentRecipe);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const notFoundRecipe = useSelector((state) => state.recipes.notFoundRecipe);
    const editFlag = useSelector((state) => state.interactions.editInteraction);
    const savedInteraction = useSelector((state) => state.interactions.savedInteraction);
    const deletedInteraction = useSelector((state) => state.interactions.deletedInteraction);


    const recipeId = props.location.state.recipeId;


    //console.log("current User"+currentUser)

    useEffect(() => {
        document.title = "Recipe Profile | RecipeNow";
    });

    useEffect(() => {
        if (!showsDispatched) {
            dispatch(getRecipeById(recipeId));
            dispatch({type: CLEAR_INTERACTION});
            setShowsDispatched(true);
        }

        return () => {
            dispatch(clearRecipesDetails());
        };
    }, [dispatch, showsDispatched]);

    useEffect(() => {
        if (currentRecipe != null) {
            if (currentUser != null) {
                setAverageRating(currentRecipe.averageRating);
                const userInteraction = currentRecipe.interactions.find(
                    interaction => interaction.user.id === currentUser.id
                );

                setCurrentUserInteraction(userInteraction);
                const filteredInteractions = currentRecipe.interactions.filter(
                    interaction => interaction.user.id !== currentUser.id
                );
                setInteractions(filteredInteractions);
            } else {
                setAverageRating(currentRecipe.averageRating);
                setInteractions(currentRecipe.interactions);
            }

        }
    }, [currentRecipe]);


    useEffect(() => {
        if (savedInteraction != null) {
            setCurrentUserInteraction(savedInteraction);
        }
    }, [savedInteraction]);

    useEffect(() => {
        if (savedInteraction != null) {
            setCurrentUserInteraction(savedInteraction);
            setAverageRating(savedInteraction.averageRatingForRecipe);
        }
    }, [savedInteraction]);

    useEffect(() => {
        if (deletedInteraction != null) {
            setCurrentUserInteraction(null);
            setAverageRating(deletedInteraction.averageRatingForRecipe);
        }
    }, [deletedInteraction]);

    useEffect(() => {
        if (currentUserInteraction && editFlag) {
            setRating(currentUserInteraction.rating);
            setReview(currentUserInteraction.review);
        } else {
            setRating('');
            setReview('');
        }
    }, [currentUserInteraction, editFlag]);


    const history = useHistory();
    const [show, setShow] = useState(false);
    const [forumEvent, setForumEvent] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = () => {
        const event = forumEvent;
        const rating = parseFloat(event.target.rating.value);
        const review = event.target.review.value;
        let interaction = {rating: rating, review: review, user: currentUser};

        if (currentUserInteraction && currentUserInteraction.id != null && currentUserInteraction.submitted != null) {
            interaction.id = currentUserInteraction.id;
            interaction.submitted = currentUserInteraction.submitted;
        }
        interaction.recipeID = recipeId;


        dispatch(saveInteraction(interaction))

        event.target.reset();
        handleClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setForumEvent(event);
        handleShow();
    };


    const overviewRef = useRef(null);
    const stepsRef = useRef(null);
    const commentsRef = useRef(null);

    const handleNavigation = (event, ref) => {
        event.preventDefault();
        const headerOffset = headerHeight + 16; // Add a margin between header and section
        const elementPosition = ref.current.offsetTop - headerOffset;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    };


    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10vh',
            textAlign: 'center',
        },
        image: {
            width: '10%',
            height: 'auto',
        },
        title: {
            color: '#333',
            marginTop: '20px',
        },
        message: {
            color: '#666',
            marginTop: '10px',
        },
    };


    if (notFoundRecipe)
        return (
            <>
                <Header fixed="true"/>
                <div style={styles.container}>
                    <img src={"https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png"} alt="Error"
                         style={styles.image}/>
                    <h1 style={styles.title}>404: Recipe Not Found</h1>
                    <p style={styles.message}>We're sorry, but the recipe you're looking for could not be found.</p>
                </div>
            </>
        );


    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };


    // console.log(currentRecipe)


    return (
        <div>
            <Header fixed="true"/>

            <div className="container mt-5">
                <div className="row">
                    <div className="book-profile-route vh-90 pt-5 col-lg-9" style={{overflowY: 'auto', color: 'white'}}>

                        {currentRecipe ? (
                            <div className="container">
                                <div className="mt-4">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#overview"
                                               onClick={(e) => handleNavigation(e, overviewRef)}>Overview</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#steps"
                                               onClick={(e) => handleNavigation(e, stepsRef)}>Steps</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#comments"
                                               onClick={(e) => handleNavigation(e, commentsRef)}>Comments
                                                ({currentUserInteraction ? interactions.length + 1 : interactions.length})</a>
                                        </li>
                                    </ul>
                                </div>


                                <div className="card mt-4 p-3 bg-light text-dark text-center">
                                    {currentUser && currentRecipe.user && currentUser.id === currentRecipe.user.id &&
                                        <RecipeOptions recipeId={currentRecipe.id}/>}
                                    <img
                                        src="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg"
                                        alt={currentRecipe.name}
                                        className="img-fluid"
                                    />
                                    <div ref={overviewRef} id="overview">
                                        <h1>{currentRecipe.name}</h1>
                                        <Rating
                                            averageRating={averageRating}
                                            ratingCount={currentUserInteraction ? interactions.length + 1 : interactions.length}
                                        />

                                    </div>
                                    <Timer minutes={currentRecipe.minutes}/>
                                    <div className="d-flex align-items-left justify-content-start mt-3">
                                        <UserInfo
                                            nume={currentRecipe.user.firstName}
                                            prenume={currentRecipe.user.lastName}
                                            descriere={currentRecipe.description}/>
                                    </div>
                                </div>


                                <div className="card mt-4 p-3 bg-light text-dark">
                                    <h3>Ingredients:</h3>
                                    <ul>
                                        {currentRecipe.ingredients.map((ingredient) => (
                                            <li key={ingredient.id}>{ingredient.name}</li>))}
                                    </ul>
                                </div>

                                <div ref={stepsRef} id="steps" className="card mt-4 p-3 bg-light text-dark">
                                    <h3>Steps:</h3>
                                    <ol>
                                        {currentRecipe.recipeStepList
                                            .sort((a, b) => a.stepNumber - b.stepNumber)
                                            .map((step) => (<li key={step.id}>{step.stepDescription}</li>))}
                                    </ol>
                                </div>

                                <div className="card mt-4 p-3 bg-light text-dark">
                                    <h3>Nutrition:</h3>
                                    <ul>
                                        <li>Calories: {currentRecipe.nutrition.calories}</li>
                                        <li>Fat: {currentRecipe.nutrition.fat}</li>
                                        <li>Saturated Fat: {currentRecipe.nutrition.saturatedFat}</li>
                                        <li>Carbohydrates: {currentRecipe.nutrition.carbohydrates}</li>
                                        <li>Fiber: {currentRecipe.nutrition.fiber}</li>
                                        <li>Protein: {currentRecipe.nutrition.protein}</li>
                                        <li>Sodium: {currentRecipe.nutrition.sodium}</li>
                                    </ul>
                                </div>

                                <div className="card mt-4 p-3 bg-light text-dark">
                                    <h3>Tags:</h3>
                                    <ul>
                                        {currentRecipe.tags.map((tag) => (<li key={tag.id}>{tag.name}</li>))}
                                    </ul>
                                </div>

                                {currentRecipe && currentRecipe.user && currentUser && currentRecipe.user.id != currentUser.id && (
                                    !(currentUserInteraction != null) || editFlag ? (
                                        <div className="card mt-4 p-3 bg-light text-dark">
                                            <h3>{editFlag ? 'Edit your Review:' : 'Leave a Review:'}</h3>
                                            <form onSubmit={handleSubmit} className="mt-3">
                                                <div className="mb-3">
                                                    <label htmlFor="rating" className="form-label">Rating</label>
                                                    <select id="rating" name="rating" className="form-select"
                                                            value={rating} onChange={handleRatingChange}>
                                                        <option value="">Select...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="review" className="form-label">Review</label>
                                                    <textarea id="review" name="review" className="form-control"
                                                              value={review} onChange={handleReviewChange}></textarea>
                                                </div>
                                                <button type="submit"
                                                        className="btn btn-primary">{editFlag ? 'Update' : 'Save'}
                                                </button>
                                                {editFlag &&
                                                    <button type="button" className="btn btn-secondary ml-2"
                                                            onClick={() => dispatch(editInteraction(false))}>Undo</button>
                                                }
                                            </form>
                                            <Modal show={show} onHide={handleClose} centered backdrop="static"
                                                   keyboard={false}>
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
                                        </div>
                                    ) : (
                                        <div className="card mt-4 p-3 bg-light text-dark">
                                            <h3>My Review:</h3>
                                            <div className="card mt-2 p-3 bg-white text-dark">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAABWVlZgYGDb29v5+fnz8/Pj4+OlpaW7u7vv7+/m5uaKiorp6elGRkb19fV7e3uzs7NqampycnLT09ODg4PFxcW/v7+pqamWlpaenp7Q0NAnJydSUlI6Ojqvr68ZGRlmZmYbGxsyMjI+Pj4RERGYmJgsLCxDQ0PRPzEMAAAEx0lEQVR4nO3diXaqMBAGYKMoWpdiVdy11m7v/4RXqtYqAZIww0y48z2AJ/8Rsic0GkIIIYQQQgghhBBCCCGEEEIIIYQQQgghXHTCYB2Pe/N10G9TlwVcsIh26s521utTlwpKZ99Seq8v4yfq0pX2vNhlxLt47z5Tl7GM4CU/3tkkpC6nq+nWJF+iOaUuq4th1tun1fKv2hnY5EvM/GpB4g/bgCdz6lJbmDjkO5lQl9tUuHELeGog/ahVY9d8iZi69Aa6ZQIq1aUuf6FluYBKDagTFIjKBuQecVY+oFJL6hQ5rJt5vQV1jkwLmIB8a9QpVEClhtRZtDpwAdUbdRgt47GSCY4duBVkQI7d8BA2oFLUgVJG0Aln1IkejKEDKsVsnAEfUDWpM90p3d/W4TQ91cYIqLbUsf5A+QuVCqhz3eAEVAfqXL96SAkVm1UN8LbwakWd7GKIFVAdqaNdAPdI/2Iy1/+Ol5DHzNsTXkAmTSJCl/SGxXKN4yKFGRY9N+dVChMcXkTM11CpF+p4J2vUhBxaxD1qQg6TGUDz3FkYdE0PuAkZVKag06Rpa+p8yI2FUj3qfGij3ysG61DICRk0+cgJGQyCkRMy+A9ddj9Z2FPn+x/q0vq3h0abZN0xmBUG2WCSjcEgH2wDhh51vEbJjXqFRtTxGthjfBYrwagJx9TpElY71m2xWOouuaE01wd1uB8BYkImG4cQe6YM+mwJxDafQXufwJsxbVFHu0J7TNnsM0VbIqUO9gurW8NowzfSAhujs5d9lIAs+qRXB4yEjP5CnA0njN7CBMIKFHWkR+ABmXTYbqCH+jz2mdwBnnPrUOfRAO27sXtGE5DjRCbjwkdwexZ21FGyAByvPGPV1t8BmpRisudSC2SZhsFSRQ6AiLwDAjyoLGZIc5WrbjYcW/pHZWaIR0wm1wq4z72xGvPmaTu+jGym1gy4nKKZ+PGEXrVtK5wjg02IlvpWjyqLdUJrZneZnWwYbAtyNDQ5mNj0qYLRiPNni78XfMcR5qZLfW/1Ler50IMxFPaWre3xEu31vRkt1jVK91f7hLoMQgghhBBCCB6egni/+hxEk0OrGodJNFiuxusAf1jyHOwjxHs+DDQHiJ9UiAcFHwGoTKuLcDdmjHy8ydbXJ+gaVYh8tsnNbgH1Ws7RroEqbQbxtI7fqGPkmpTNuP6ijlAoKvOsdlAP/IBxXxNAvR4J0sjtepD2gbrgFly2wYXIp9CBRdYB59RFtvVtWeF48wre2O1TQb4ZCYlF0+hnQIsbl3BPZyN6NXwXMc+EIjPceUtdzDKMLrBrUpeyFINLl3ytZa4K5zhwb0ioQOGr6MdoIk/Bc4p7zWM18jfoHIt/gL3cTapoV49XKq9rU4e/MPdPrMNbmMjuvPlfkZ5l3mLnfVt4tclKiHnRTLWydlTzndu2lVHXQH5VjJo+YT0awzP9whTq7fEV0996inyJZaW+dQFr01b80DX63s4/aemOaSJ+S4WA7gxOnSoa/Sd369PeJ3STbtRlgqX7agR1mYClA9apz5ZIJwT/jiix9HyUx6sVWumltrolTPe965Yw3amRhL6RhP6ThP6ThP6ThP6ThP6ThP6ThP6ThP5LJwxHzToZ8b9gUgghPPIPAB9qWTAi70EAAAAASUVORK5CYII="
                                                                alt="User Profile"
                                                                className="rounded-circle me-2"
                                                                style={{width: "40px", height: "40px"}}
                                                            />
                                                            <div>
                                                                <h5>{currentUserInteraction.user.firstName} {currentUserInteraction.user.lastName}</h5>
                                                            </div>
                                                        </div>
                                                        <p className="text-muted">Submitted: {new Date(currentUserInteraction.submitted).toLocaleDateString()} {new Date(currentUserInteraction.submitted).toLocaleTimeString()}</p>
                                                        {currentUserInteraction.editDate != null && (
                                                            <p className="text-muted">Edit
                                                                Date: {new Date(currentUserInteraction.editDate).toLocaleDateString()} {new Date(currentUserInteraction.editDate).toLocaleTimeString()}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span
                                                            className="badge bg-primary">{currentUserInteraction.rating}/5</span>
                                                    </div>
                                                    <InteractionOptions interactionID={currentUserInteraction.id}/>
                                                </div>
                                                <p>{currentUserInteraction.review}</p>
                                            </div>
                                        </div>


                                    )
                                )}


                                <div ref={commentsRef} id="comments" className="card mt-4 p-3 bg-light text-dark">
                                    <h3>Reviews:</h3>
                                    {interactions.map((interaction) => (
                                        <div key={interaction.id} className="card mt-2 p-3 bg-white text-dark">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAABWVlZgYGDb29v5+fnz8/Pj4+OlpaW7u7vv7+/m5uaKiorp6elGRkb19fV7e3uzs7NqampycnLT09ODg4PFxcW/v7+pqamWlpaenp7Q0NAnJydSUlI6Ojqvr68ZGRlmZmYbGxsyMjI+Pj4RERGYmJgsLCxDQ0PRPzEMAAAEx0lEQVR4nO3diXaqMBAGYKMoWpdiVdy11m7v/4RXqtYqAZIww0y48z2AJ/8Rsic0GkIIIYQQQgghhBBCCCGEEEIIIYQQQgghXHTCYB2Pe/N10G9TlwVcsIh26s521utTlwpKZ99Seq8v4yfq0pX2vNhlxLt47z5Tl7GM4CU/3tkkpC6nq+nWJF+iOaUuq4th1tun1fKv2hnY5EvM/GpB4g/bgCdz6lJbmDjkO5lQl9tUuHELeGog/ahVY9d8iZi69Aa6ZQIq1aUuf6FluYBKDagTFIjKBuQecVY+oFJL6hQ5rJt5vQV1jkwLmIB8a9QpVEClhtRZtDpwAdUbdRgt47GSCY4duBVkQI7d8BA2oFLUgVJG0Aln1IkejKEDKsVsnAEfUDWpM90p3d/W4TQ91cYIqLbUsf5A+QuVCqhz3eAEVAfqXL96SAkVm1UN8LbwakWd7GKIFVAdqaNdAPdI/2Iy1/+Ol5DHzNsTXkAmTSJCl/SGxXKN4yKFGRY9N+dVChMcXkTM11CpF+p4J2vUhBxaxD1qQg6TGUDz3FkYdE0PuAkZVKag06Rpa+p8yI2FUj3qfGij3ysG61DICRk0+cgJGQyCkRMy+A9ddj9Z2FPn+x/q0vq3h0abZN0xmBUG2WCSjcEgH2wDhh51vEbJjXqFRtTxGthjfBYrwagJx9TpElY71m2xWOouuaE01wd1uB8BYkImG4cQe6YM+mwJxDafQXufwJsxbVFHu0J7TNnsM0VbIqUO9gurW8NowzfSAhujs5d9lIAs+qRXB4yEjP5CnA0njN7CBMIKFHWkR+ABmXTYbqCH+jz2mdwBnnPrUOfRAO27sXtGE5DjRCbjwkdwexZ21FGyAByvPGPV1t8BmpRisudSC2SZhsFSRQ6AiLwDAjyoLGZIc5WrbjYcW/pHZWaIR0wm1wq4z72xGvPmaTu+jGym1gy4nKKZ+PGEXrVtK5wjg02IlvpWjyqLdUJrZneZnWwYbAtyNDQ5mNj0qYLRiPNni78XfMcR5qZLfW/1Ler50IMxFPaWre3xEu31vRkt1jVK91f7hLoMQgghhBBCCB6egni/+hxEk0OrGodJNFiuxusAf1jyHOwjxHs+DDQHiJ9UiAcFHwGoTKuLcDdmjHy8ydbXJ+gaVYh8tsnNbgH1Ws7RroEqbQbxtI7fqGPkmpTNuP6ijlAoKvOsdlAP/IBxXxNAvR4J0sjtepD2gbrgFly2wYXIp9CBRdYB59RFtvVtWeF48wre2O1TQb4ZCYlF0+hnQIsbl3BPZyN6NXwXMc+EIjPceUtdzDKMLrBrUpeyFINLl3ytZa4K5zhwb0ioQOGr6MdoIk/Bc4p7zWM18jfoHIt/gL3cTapoV49XKq9rU4e/MPdPrMNbmMjuvPlfkZ5l3mLnfVt4tclKiHnRTLWydlTzndu2lVHXQH5VjJo+YT0awzP9whTq7fEV0996inyJZaW+dQFr01b80DX63s4/aemOaSJ+S4WA7gxOnSoa/Sd369PeJ3STbtRlgqX7agR1mYClA9apz5ZIJwT/jiix9HyUx6sVWumltrolTPe965Yw3amRhL6RhP6ThP6ThP6ThP6ThP6ThP6ThP6ThP5LJwxHzToZ8b9gUgghPPIPAB9qWTAi70EAAAAASUVORK5CYII="
                                                            alt="User Profile"
                                                            className="rounded-circle me-2"
                                                            style={{width: "40px", height: "40px"}}
                                                        />
                                                        <div>
                                                            <h5>{interaction.user.firstName} {interaction.user.lastName}</h5>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted">Submitted: {new Date(interaction.submitted).toLocaleDateString()} {new Date(interaction.submitted).toLocaleTimeString()}</p>
                                                    {interaction.editDate && (
                                                        <p className="text-muted">Edit
                                                            Date: {new Date(interaction.editDate).toLocaleDateString()} {new Date(interaction.editDate).toLocaleTimeString()}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="badge bg-primary">{interaction.rating}/5</span>
                                                </div>
                                            </div>
                                            <p>{interaction.review}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                Loading...
                            </div>
                        )}
                    </div>
                    <div className="col-lg-3" style={{position: 'sticky', top: '0'}}>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default RecipeDetails;