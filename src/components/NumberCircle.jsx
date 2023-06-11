import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    circleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
}));

const NumberCircle = ({ number }) => {
    const classes = useStyles();

    return (
        <div className={classes.circleContainer}>
            {number}
        </div>
    );
};

export default NumberCircle;