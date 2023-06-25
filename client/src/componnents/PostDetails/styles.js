import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '600px',
    maxHeight: '600px',
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      width: '250px',
    },
  },
  card: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      margin: '0',
    },
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: '2rem',
    },
  },
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '1rem',
  },
  recommendedPost: {
    display: 'flex',
    // flex: '1 0 21%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    width: '25%',
    position: 'relative',
    margin: '20px 10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    // display: 'flex', justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    overflow: 'auto', marginRight: '30px', 
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    },
  }
}));