document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date-input');
    const dayInput = document.getElementById('day-input');
    const titleInput = document.querySelector('.page-title');
    const notebookContent = document.getElementById('notebook-content');
    const pageNumberElement = document.querySelector('.page-number');
    const saveBtn = document.getElementById('save-page');

    // Set today's date and day
    function setDateAndDay(date) {
        const options = { weekday: 'long' };
        const selectedDate = date || new Date();
        dateInput.value = selectedDate.toISOString().split("T")[0];
        dayInput.value = selectedDate.toLocaleDateString('en-US', options);
    }

    setDateAndDay();

    // Update day based on selected date
    dateInput.addEventListener('change', () => {
        const selectedDate = new Date(dateInput.value);
        setDateAndDay(selectedDate);
    });

    // Floating ball toggle
    const floatingBall = document.getElementById('floating-ball');
    const ballMain = document.getElementById('ball-main');
    const ballOptions = document.querySelector('.ball-options');

    ballMain.addEventListener('click', function () {
        ballOptions.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
        if (!floatingBall.contains(e.target)) {
            ballOptions.classList.remove('show');
        }
    });

    // Text formatting
    document.querySelectorAll('.ball-option').forEach(option => {
        if (option.classList.contains('color-picker')) {
            option.addEventListener('input', function () {
                const command = this.id === 'text-color' ? 'foreColor' : 'hiliteColor';
                document.execCommand(command, false, this.value);
                notebookContent.focus();
            });
        } else if (option.tagName === 'SELECT') {
            option.addEventListener('change', function () {
                document.execCommand('fontName', false, this.value);
                notebookContent.focus();
            });
        } else {
            option.addEventListener('click', function () {
                const command = this.getAttribute('data-command');
                document.execCommand(command, false, null);
                notebookContent.focus();
            });
        }
    });

    // Page Navigation
    let currentPage = 1;
    const pageContents = {
        1: {
            title: '',
            content: ''
        }
    };

    function updatePageContent() {
        if (!pageContents[currentPage]) {
            pageContents[currentPage] = { title: '', content: '' };
        }
        titleInput.textContent = pageContents[currentPage].title;
        notebookContent.innerHTML = pageContents[currentPage].content;
        pageNumberElement.textContent = currentPage;
    }

    document.getElementById('next-page').addEventListener('click', () => {
        saveCurrentPage();
        currentPage++;
        updatePageContent();
    });

    // Automatically go to next page after 35 lines
    notebookContent.addEventListener('input', () => {
        const text = notebookContent.innerText || notebookContent.textContent;
        const lines = text.split(/\r\n|\r|\n/).length;
        if (lines >= 35) {
            saveCurrentPage();
            currentPage++;
            updatePageContent();
        }
    });

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            saveCurrentPage();
            currentPage--;
            updatePageContent();
        }
    });

    function saveCurrentPage() {
        pageContents[currentPage] = {
            title: titleInput.textContent,
            content: notebookContent.innerHTML
        };
    }

    // Save page content
    saveBtn.addEventListener('click', async () => {
        saveCurrentPage();
        const content = pageContents[currentPage];
        const fileContent = `Title: ${content.title}\nDate: ${dateInput.value}\nDay: ${dayInput.value}\n\n${content.content.replace(/<[^>]*>/g, '')}`;

        if ('showSaveFilePicker' in window) {
            try {
                const options = {
                    suggestedName: `PTOM_Page_${currentPage}.txt`,
                    types: [{
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] },
                    }],
                };
                const handle = await window.showSaveFilePicker(options);
                const writable = await handle.createWritable();
                await writable.write(fileContent);
                await writable.close();
                alert('File saved successfully.');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    alert('Error saving file: ' + err.message);
                }
            }
        } else {
            // Fallback for browsers without File System Access API
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.download = `PTOM_Page_${currentPage}.txt`;
            link.href = window.URL.createObjectURL(blob);
            link.click();
        }
    });

    // Dragging the floating ball
    let isDragging = false, offsetX, offsetY;

    ballMain.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - floatingBall.getBoundingClientRect().left;
        offsetY = e.clientY - floatingBall.getBoundingClientRect().top;
        floatingBall.style.transition = 'none';
        ballOptions.classList.remove('show');
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        floatingBall.style.left = `${e.clientX - offsetX}px`;
        floatingBall.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        floatingBall.style.transition = 'all 0.3s';
    });
});
