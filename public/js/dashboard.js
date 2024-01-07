const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogpost-title').value.trim();
    const body = document.querySelector('#blogpost-body').value.trim();

    if(title && body) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json'
            },
        });
    
        if(!response.ok) {
            alert('Failed to create blogpost');      
        } else {
            document.location.replace('/dashboard');
            
            renderItem(response);
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
document.querySelector('.create-post').addEventListener('submit', createPostHandler);