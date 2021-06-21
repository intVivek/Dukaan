import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const CssTextField = withStyles({
  root: {
    width : '80%',
    "& label.Mui-focused": {
      color: 'gray',
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: '#2874f0'
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      }
    },
    '&:hover': {
      '&::after': {
        backgroundColor: 'red'
      }
    }
  }
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedInputs(props) {
  const classes = useStyles();

  return <CssTextField  className={classes.margin} label={props.placeHolder} />;
}