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

const addBlogpostHandler = (event) => {
    event.preventDefault();
???

}

document.querySelector('.create-blogpost').addEventListener('submit', createPostHandler);

document.querySelector('.edit-blogpost').addEventListener('submit', editButtonHandler);

document.querySelector('.add-blogpost').addEventListener('click', )addBlogpostHandler);