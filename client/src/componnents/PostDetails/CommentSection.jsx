import React, { useState } from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyle from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
   const classes = useStyle();
   const [comments, setComments] = useState(post?.comments);
   const [comment, setComment] = useState('');
   const user = JSON.parse(localStorage.getItem('profile'));
   const dispatch = useDispatch();

   const handleClick = async () => {
      const finalComment = `${user.result.name}: ${comment}`;

      const newComments = await dispatch(commentPost(finalComment, post._id));

      setComments(newComments);
      setComment('');
   }

   return (
      <>
         <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>
            {comments.map((comment, i) => (
               <Typography key={i} gutterBottom variant='subtitle1' style={{ margin: '20px 0' }}>
                  <strong>{comment.split(': ')[0]}:</strong>
                  {comment.split(':')[1]}
                  <Divider style={{ width: '33%' }} />
               </Typography>
            ))}
         </div>

         {user?.result?.name && (
            <div style={{ width: '70%', marginTop: '30px' }}>
               <Typography gutterBottom variant='h6'>Write a Comment</Typography>
               <TextField
                  fullWidth
                  rows={4}
                  variant='outlined'
                  label='Comment'
                  multiline
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
               />
               <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick}>
                  Submit
               </Button>
            </div>
         )}
      </>
   );
}

export default CommentSection;