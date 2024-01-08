//Identify elements for hide/show
const commentButton = document.querySelector('#comment-button');
const commentFormEl = document.querySelector('.comment-form-el');
const commentForm = document.querySelector('#comment-form');
const blogpostsSec = document.getElementById('blogposts-sec');

//Set attributes
commentFormEl.setAttribute("style", "display: none");
blogpostsSec.setAttribute("style", "display: block");

const commentButtonHandler = (event) => {
    event.preventDefault();
    commentFormEl.setAttribute("style", "display: block");
    blogpostsSec.setAttribute("style", "display: none");
}

const createCommentHandler = async (event) => {
    event.preventDefault();

    const id = event.target.data_id;
    const comment = document.getElementById('comment').value.trim();

    if(comment) {
        const response = await fetch(`/api/blogs/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok) {
            alert('Failed to create blogpost');      
        } else {
            document.location.replace('/');
        }
    }
};

const openBlogpost = async (event) => {
    event.preventDefault();
    const id = event.target.blog_id
    document.location.replace(`blogs/${id}`);
}

document.querySelector('#comment-button').addEventListener('click', commentButtonHandler);

document.querySelector('.comment-form').addEventListener('click', createCommentHandler);

document.querySelector('#comment-title').addEventListener('click', openBlogpost);

