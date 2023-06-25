import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, CardActionArea, CardMedia, CardContent, Card, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import Call from '@material-ui/icons/Call';

import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

const PostDetails = () => {
   const { post, posts, isLoading } = useSelector((state) => state.posts);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const classes = useStyles();
   const { id } = useParams();

   useEffect(() => {
      dispatch((getPost(id)));
   }, [id]);

   useEffect(() => {
     if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
     }
   }, [post]);


   if (!post) return null;

   if (isLoading) {
      return(
         <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7rem" />
         </Paper>
      );
   };

   const recommendedPosts = posts.filter( ({ _id }) => _id !== post._id );

   const openPost = (_id) => { navigate(`/posts/${_id}`) }

   return (
      <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
         <div className={classes.card}>
            <div className={classes.section}>
               <Typography className={classes.title} variant="h3" component="h2" color='secondary'>{post.title}</Typography>
               <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
               <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
               <Typography variant="h6">Created by: {post.name}</Typography>
               <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
               <Divider style={{ margin: '20px 0' }} />
               <CommentSection post={post} />
               <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
               <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
               <Button style={{ marginTop: '3rem' }} variant='contained' color='secondary' size='large' startIcon={<Call />}>
                  CALL NOW! +123456789
               </Button>
            </div>
         </div>

         {recommendedPosts.length && (
            <div className={classes.section}>
               <Typography variant='h4' gutterBottom color='secondary'>You might also like:</Typography>
               <Divider />
               <div className={classes.recommendedPosts}>
                  {recommendedPosts.map(({ title, message, name, selectedFile, tags, _id }) => (
                     <Card className={classes.recommendedPost} raised elevation={6} key={_id}>
                        <CardActionArea onClick={() => openPost(_id)} key={_id}>
                           <CardMedia component="img" image={selectedFile} alt={title} height="200px" width="200px" />
                           <CardContent>
                              <Typography variant="body2" color="textSecondary">{tags.map((tag) => `#${tag} `)}</Typography>
                              <Typography variant="subtitle1">author: {name}</Typography>
                              <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                 {message.split(/\s+/).slice(0, 20).join(" ")}...
                              </Typography>
                           </CardContent>
                        </CardActionArea>
                     </Card>
                  ))}
               </div>
            </div>
         )}
      </Paper>
   );
};

export default PostDetails;