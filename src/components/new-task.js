
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
}));


const NewTaskStyle = styled.section`
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  padding:4px 12px;
`
const Title = styled.h1`
  width:100%;
  text-align:center;
`

const NewTask = ({ changeDateTime, changeInput, datetime }) => {
  const classes = useStyles();

  return (
    <NewTaskStyle>
      <Title>NeW Task</Title>
      <form className={classes.container} noValidate>
        <TextField required label="Task Content"
          placeholder="Please Insert Your Task"
          id="filled-basic" variant="filled"
          onChange={changeInput} />
        <TextField
          id="datetime-local"
          label="Due Date"
          type="datetime-local"
          value={datetime}
          onChange={changeDateTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
      </form>
    </NewTaskStyle>

  );
};

export default NewTask;
