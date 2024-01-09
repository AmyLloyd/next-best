//Identify elements for hide/show
const commentButton = document.querySelector('#comment-button');
const commentFormEl = document.querySelector('.comment-form-el');
const commentForm = document.querySelector('#comment-form');
const blogpostsSec = document.getElementById('blogposts-sec');

//Set attributes
commentFormEl.setAttribute("style", "display: none");
blogpostsSec.setAttribute("style", "display: block");

const commentButtonHandler = (blogpostId) => {
    commentFormEl.setAttribute("style", "display: block");
    blogpostsSec.setAttribute("style", "display: none");

    document.querySelector('.comment-form').addEventListener('submit', function(event) { 
        event.preventDefault(); 
        createCommentHandler(blogpostId)
    });
}

const createCommentHandler = async (blogpostId) => {
    const post_id = blogpostId;
    const comment = await document.getElementById('comment').value.trim();

    console.log(post_id, "post_id");
    console.log(comment);


    if(comment && post_id) {
        const response = await fetch(`/api/blogs/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("createCommentHandler proceeding");
        if(!response.ok) {
            return alert('Failed to create blogpost');      
        } else {
            alert('Post created');
            document.location.replace('/');
        }
    }
};

document.getElementById('blogContainer').addEventListener('click', function(event) {
    // Check if the clicked element is a button with the class "button"
    if (event.target.classList.contains('button')) {
        // Get the data_id attribute from the parent div
        var blogpostId = event.target.parentElement.getAttribute('data_id');

        // Call your function or perform your logic with the blogpostId
        // handleButtonClick(blogpostId);
        commentButtonHandler(blogpostId);
    }
});


