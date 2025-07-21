// Array of video data
const videoData = [
    {
        title: "NextUp Chatbot (Event Discovery Assistant)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_psngi7a8",
        thumbnail: "thumbnails/nextup_chatbot.png",
        description: "A conversational AI assistant that helps users discover relevant events hosted by the NextUp organization. The chatbot analyzes user preferences, interests, and availability to recommend upcoming NextUp events, workshops, and networking opportunities tailored to their professional development needs.",
        release: "June 2025"
    },
    {
        title: "Fashion Agent (Style Decision Assistant)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_p2v72976",
        thumbnail: "thumbnails/fashion_agent.png",
        description: "An AI-powered fashion assistant that helps users decide what to wear based on weather conditions, occasion, personal style preferences, and wardrobe analysis. The agent provides personalized outfit recommendations and styling advice to help users look their best for any event or daily activity.",
        release: "May 2025"
    },
    {
        title: "VibeVault (Music Insights Analyzer)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_vn849qn1",
        thumbnail: "thumbnails/vibe_vault.png",
        description: "VibeVault is a platform that generates insights from music and listener data. The tool uses LLMs to analyze trends in music and generate custom audience segments.",
        release: "May 2025"
    },
    {
        title: "PackLite (Smart Packing Assistant)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_cnavsafm", 
        thumbnail: "thumbnails/packlite.png",
        description: "A smart travel packing assistant that creates customized packing checklists for trips. It helps users prepare by generating detailed lists of clothing, toiletries, and other essentials based on destination, trip duration, and weather conditions. The tool provides specific quantity recommendations and packing tips tailored to each journey.",
        release: "May 2025"
    },
    {
        title: "Resume Optimizer (Feedback Generator for Resumes)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_fm9c8auc",
        thumbnail: "thumbnails/resume_optimizer.png",
        description: "Resume Optimizer is an AI-powered feedback generator for resumes. The tool uses LLMs to analyze resumes and provide feedback on the user's resume.",
        release: "May 2025"
    },
    {
        title: "Bench Warmers (Reimagined Role Search Tool)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_jpy8ihrk",
        thumbnail: "thumbnails/benchwarmers.png",
        description: "An MVP tool designed to simplify roles search by leveraging AI/ML into a utility for enhancing staffing efforts. It accepts user prompts, parses keywords using LLM, queries structured data, and returns role suggestions, contacts, and resume-based information. Powered by DuckDB, LangChain, and Streamlit.",
        release: "May 2025"
    },
    {
        title: "Task Decomposition Agent (Orchestration Agent for Marketing Tasks)",
        type: "external",
        external_url: "https://mediaexchange.accenture.com/media/t/1_vp72l58q",
        thumbnail: "thumbnails/task_decomposition.png",
        description: "Task Decomposition Agent is an orchestration agent for marketing tasks. The tool uses LLMs to decompose marketing tasks into smaller, more manageable tasks.",
        release: "May 2025"
    }
];

// Current project index
let currentProjectIndex = 0;

// Initialize the project viewer
function initializeViewer() {
    console.log('Initializing project viewer...');
    
    // Load the current project
    loadProject(currentProjectIndex);
}

// Load a specific project
function loadProject(index) {
    console.log('Loading project index:', index, 'Title:', videoData[index].title);
    const projectInfo = videoData[index];
    
    // Update project info
    document.getElementById('video-title').textContent = projectInfo.title;
    document.getElementById('video-prompt').textContent = projectInfo.description || '';
    
    // Clear player container and create thumbnail viewer
    const playerContainer = document.getElementById('player');
    playerContainer.innerHTML = '';
    playerContainer.classList.add('loading');
    
    // Create thumbnail container
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'project-thumbnail-container';
    
    // Create thumbnail image
    const thumbnailImg = document.createElement('div');
    thumbnailImg.className = 'project-thumbnail';
    
    // Set background color as fallback
    thumbnailImg.style.backgroundColor = '#333';
    
    // Try to load the thumbnail image
    if (projectInfo.thumbnail) {
        const img = new Image();
        img.onload = function() {
            thumbnailImg.style.backgroundImage = `url(${projectInfo.thumbnail})`;
            thumbnailImg.style.backgroundSize = 'cover';
            thumbnailImg.style.backgroundPosition = 'center';
            playerContainer.classList.remove('loading');
        };
        img.onerror = function() {
            console.warn('Thumbnail not found:', projectInfo.thumbnail);
            // Use a placeholder background color
            playerContainer.classList.remove('loading');
        };
        img.src = projectInfo.thumbnail;
    } else {
        playerContainer.classList.remove('loading');
    }
    
    // Create view button
    const viewButton = document.createElement('a');
    viewButton.className = 'view-mx-button';
    viewButton.href = projectInfo.external_url;
    viewButton.target = '_blank';
    viewButton.rel = 'noopener noreferrer';
    viewButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
        View on MediaExchange
    `;
    
    // Append elements
    thumbnailContainer.appendChild(thumbnailImg);
    thumbnailContainer.appendChild(viewButton);
    playerContainer.appendChild(thumbnailContainer);
    
    // Hide or show description section based on whether there's a description
    const descriptionSection = document.querySelector('.prompt-container');
    if (!projectInfo.description) {
        descriptionSection.style.display = 'none';
    } else {
        descriptionSection.style.display = 'block';
    }
    
    // Update active thumbnail in sidebar
    updateActiveThumbnail(index);
}

// Update active thumbnail
function updateActiveThumbnail(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
    
    // Scroll the active thumbnail into view
    const activeThumb = document.querySelector('.thumbnail.active');
    if (activeThumb) {
        // Check if we're in mobile or desktop layout
        const isVerticalLayout = window.innerWidth > 992;
        activeThumb.scrollIntoView({ 
            behavior: 'smooth', 
            block: isVerticalLayout ? 'nearest' : 'nearest', 
            inline: isVerticalLayout ? 'nearest' : 'center' 
        });
    }
}

// Navigate to the next project
function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % videoData.length;
    loadProject(currentProjectIndex);
}

// Navigate to the previous project
function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + videoData.length) % videoData.length;
    loadProject(currentProjectIndex);
}

function createThumbnails() {
    const container = document.getElementById('thumbnails-container');
    container.innerHTML = ''; // Clear existing thumbnails

    // Group projects by release
    const groupedProjects = videoData.reduce((groups, project) => {
        if (!groups[project.release]) {
            groups[project.release] = [];
        }
        groups[project.release].push(project);
        return groups;
    }, {});

    // Create a flex container for thumbnails
    const flexContainer = document.createElement('div');
    flexContainer.className = 'thumbnails-flex-container';

    // Populate the container with thumbnails
    Object.keys(groupedProjects).forEach((release) => {
        groupedProjects[release].forEach((project) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (videoData.indexOf(project) === currentProjectIndex) {
                thumbnail.classList.add('active');
            }

            // Use a placeholder div for the thumbnail
            const imgUrl = project.thumbnail || '';
            
            // Create elements for the thumbnail
            const badgeDiv = document.createElement('div');
            badgeDiv.className = 'release-badge';
            badgeDiv.textContent = release;
            
            const imgDiv = document.createElement('div');
            imgDiv.className = 'thumbnail-img';
            imgDiv.style.backgroundColor = '#333';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'thumbnail-title';
            titleDiv.textContent = project.title;
            
            // Try to load the actual image if it exists
            if (imgUrl) {
                const img = new Image();
                img.onload = function() {
                    imgDiv.style.backgroundImage = `url(${imgUrl})`;
                    imgDiv.style.backgroundSize = 'cover';
                    imgDiv.style.backgroundPosition = 'center';
                };
                img.src = imgUrl;
            }
            
            // Append all parts to the thumbnail
            thumbnail.appendChild(badgeDiv);
            thumbnail.appendChild(imgDiv);
            thumbnail.appendChild(titleDiv);

            thumbnail.addEventListener('click', () => {
                currentProjectIndex = videoData.indexOf(project);
                loadProject(currentProjectIndex);
            });

            flexContainer.appendChild(thumbnail);
        });
    });

    // Append the flex container to the main container
    container.appendChild(flexContainer);
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Create thumbnails
    createThumbnails();
    
    // Initialize the viewer
    initializeViewer();
    
    // Set up navigation buttons
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextProject);
    } else {
        console.warn('Next button not found');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevProject);
    } else {
        console.warn('Previous button not found');
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextProject();
        } else if (e.key === 'ArrowLeft') {
            prevProject();
        }
    });
}); 