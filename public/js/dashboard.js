//Define sections ready for hiding/showing
const blogpostsSec = document.getElementById('blogpost-sec');
const createCard = document.querySelector('.create-card');
const updateCard = document.querySelector('.update-card');
const lowerButtons = document.querySelector('.lower-buttons');

//Set starting attributes
blogpostsSec.setAttribute("style", "display: block");
createCard.setAttribute("style", "display: none");
updateCard.setAttribute("style", "visibility: hidden");
lowerButtons.setAttribute("style", "visibility: visible");

//button handlers to make forms appear
const addButton = document.querySelector('#add-button');
const updateButton = document.querySelector('#update-button');


//form handlers
const createPostHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#blogpost-title').value.trim();
    const content = document.querySelector('#blogpost-body').value.trim();
    console.log(title, "title", content, "content");

    if(title && content) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 
                'Content-Type': 'application/json'
            },
        });

        console.log(response, "response");
    
        if(!response.ok) {
            alert('Failed to create blogpost');      
        } else {
            document.location.replace('/');
        }
    }
};

const renderItem = (blog) => {
    const blogAnchor = document.querySelector('#blogpost-anchor');
    let blogCard = document.createElement('div');
    let link = document.createElement('a');
    blogCard.setAttribute('class', 'card');
    blogCard.setAttribute('style', 'background-color: var(--background)');
    //Check this
    link.setAttribute('href', `/blogs/${blog.id}`);
    blogCard.append(link);
    blogAnchor.append(blogCard);
}

const editButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const title = document.querySelector('#edit-title').value.trim();
        const content = document.querySelector('#edit-body').value.trim();

        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'UPDATE',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blogpost');
        }
    }
};

const addButtonHandler = (event) => {
    event.preventDefault();
    createCard.setAttribute("style", "display: block");
    addButton.setAttribute("style", "display: none");
    updateCard.setAttribute("style", "display: none"); 
    blogpostsSec.setAttribute("style", "display: none");
    lowerButtons.setAttribute("style", "display: none");
}

const updateButtonHandler = (event) => {
    event.preventDefault();
    updateCard.setAttribute("style", "display: block");
    addButton.setAttribute("style", "display: none");
    blogpostsSec.setAttribute("style", "display: none");
    lowerButtons.setAttribute("style", "display: none");
    createCard.setAttribute("style", "display: none");
}

document.querySelector('.create-blogpost').addEventListener('submit', createPostHandler);

document.querySelector('.edit-blogpost').addEventListener('submit', editButtonHandler);

document.querySelector('#add-button').addEventListener('click', addButtonHandler);

document.querySelector('.update-button').addEventListener('click', updateButtonHandler);