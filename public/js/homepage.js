//Identify elements for hide/show
const commentButton = document.querySelector('#comment-button');
const commentFormEl = document.querySelector('.comment-form-el');
const commentForm = document.querySelector('#comment-form');
const blogpostsSec = document.getElementById('blogposts-sec');

//Set attributes
commentFormEl.setAttribute("style", "display: none");
blogpostsSec.setAttribute("style", "display: block");

const commentButtonHandler = (blogpostId) => {

    console.log("Hello");
    commentFormEl.setAttribute("style", "display: block");
    blogpostsSec.setAttribute("style", "display: none");
}

const createCommentHandler = async (event) => {
    event.preventDefault();

    const id = event.target.data_id;
    const comment = document.getElementById('comment').value.trim();

    //object 
    // const commentData = 

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

function handleButtonClick(blogpostId) {
    // Your logic here
    console.log('Button clicked for blogpost with ID:', blogpostId);
}

//for loop to attach event listener to all the buttons

document.querySelector('#comment-button2').addEventListener('click', commentButtonHandler);

document.querySelector('.comment-form').addEventListener('click', createCommentHandler);


