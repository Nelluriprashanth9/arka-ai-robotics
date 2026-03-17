
document.addEventListener('DOMContentLoaded', () => {
const topNav = document.querySelector('.top-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const programContent = {
robotics: {
title: 'Robotics Workshops',
description: 'Students build confidence with sensors, motors, controllers, and guided robot challenges designed for real classroom engagement.',
points: [
'Placeholder module: robot assembly and motion basics',
'Placeholder module: sensors, controls, and coding tasks',
'Placeholder module: school showcase challenge or demo day'
],
image: 'images/r1.png',
imageAlt: 'Robotics Workshops preview',
video: 'Add robotics video embed or thumbnail here'
},
coding: {
title: 'Coding & Scratch',
description: 'Learners create stories, games, and logic-driven projects while building computational thinking in a fun, visual way.',
points: [
'Placeholder module: Scratch basics and interface walkthrough',
'Placeholder module: animation, game logic, and debugging',
'Placeholder module: student game gallery or coding challenge'
],
image: 'images/r2.png',
imageAlt: 'Coding and Scratch preview',
video: 'Add coding video embed or screen recording here'
},
ai: {
title: 'AI for Students',
description: 'Students explore how AI works through age-appropriate activities, model thinking, ethics discussions, and hands-on experiments.',
points: [
'Placeholder module: what AI is and where students see it',
'Placeholder module: simple model training and prompt activities',
'Placeholder module: responsible AI and classroom mini project'
],
image: 'images/r3.png',
imageAlt: 'AI for Students preview',
video: 'Add AI program video or explainer here'
},
stem: {
title: 'STEM Innovation',
description: 'Hands-on engineering experiences bring science, design, and teamwork together through practical problem-solving projects.',
points: [
'Placeholder module: design thinking and prototype planning',
'Placeholder module: build-test-improve STEM challenge',
'Placeholder module: exhibition-ready innovation project'
],
image: 'images/r4.png',
imageAlt: 'STEM Innovation preview',
video: 'Add STEM innovation demo video here'
}
};

const links = document.querySelectorAll('a[href^="#"]');

if (topNav && navToggle && navLinksContainer) {
navToggle.addEventListener('click', () => {
const isOpen = topNav.classList.toggle('menu-open');
navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
topNav.classList.remove('menu-open');
navToggle.setAttribute('aria-expanded', 'false');
});
});
}

links.forEach(link => {
link.addEventListener('click', function(e) {

e.preventDefault();

const targetId = this.getAttribute('href').substring(1);
const targetElement = document.getElementById(targetId);

if(targetElement){

window.scrollTo({
top: targetElement.offsetTop - 80,
behavior:'smooth'
});

}

});
});

const programItems = document.querySelectorAll('.program-item');
const programDetailPanel = document.getElementById('program-detail-panel');
const programDetailTitle = programDetailPanel?.querySelector('.program-detail-title');
const programDetailDescription = programDetailPanel?.querySelector('.program-detail-description');
const programDetailPoints = programDetailPanel?.querySelector('.program-detail-points');
const programDetailImage = programDetailPanel?.querySelector('.program-detail-image');
const programDetailVideo = programDetailPanel?.querySelector('.program-detail-video');

function populateProgramDetail(programKey) {
const program = programContent[programKey];

if (
!program ||
!programDetailPanel ||
!programDetailTitle ||
!programDetailDescription ||
!programDetailPoints ||
!programDetailImage ||
!programDetailVideo
) {
return;
}

programDetailTitle.textContent = program.title;
programDetailDescription.textContent = program.description;
programDetailImage.src = program.image;
programDetailImage.alt = program.imageAlt;
programDetailVideo.textContent = program.video;

programDetailPoints.innerHTML = '';
program.points.forEach(point => {
const item = document.createElement('li');
item.textContent = point;
programDetailPoints.appendChild(item);
});
}

programItems.forEach(programItem => {
const card = programItem.querySelector('.program-card');

if (!card || !programDetailPanel) {
return;
}

card.addEventListener('click', () => {
const isOpening = !card.classList.contains('is-active');

programItems.forEach(otherItem => {
const otherCard = otherItem.querySelector('.program-card');

if (!otherCard) {
return;
}

otherCard.classList.remove('is-active');
otherCard.setAttribute('aria-pressed', 'false');
});

if (!isOpening) {
programDetailPanel.style.display = 'none';
return;
}

populateProgramDetail(card.dataset.program);
card.classList.add('is-active');
card.setAttribute('aria-pressed', 'true');
programDetailPanel.style.display = 'grid';
programDetailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
});

const schoolOfferCards = document.querySelectorAll('.school-offer-card');
const selectedProgramsInput = document.getElementById('selected-school-programs');
const selectedProgramsDisplay = document.getElementById('school-programs-display');
const selectedProgramsSummary = document.getElementById('school-selection-summary-text');
const schoolProgramForm = document.getElementById('school-program-form');
const inquiryForms = document.querySelectorAll('form[action^="https://formsubmit.co/"]');

function syncSelectedSchoolPrograms() {
const selectedOffer = Array.from(schoolOfferCards)
.find(card => card.classList.contains('is-selected'))
?.dataset.schoolOffer;

const selectedText = selectedOffer
? selectedOffer
: 'No option selected yet.';

if (selectedProgramsInput) {
selectedProgramsInput.value = selectedOffer || '';
}

if (selectedProgramsDisplay) {
selectedProgramsDisplay.value = selectedOffer || '';
}

if (selectedProgramsSummary) {
selectedProgramsSummary.textContent = selectedText;
}
}

schoolOfferCards.forEach(card => {
card.addEventListener('click', () => {
schoolOfferCards.forEach(otherCard => {
const isActive = otherCard === card;
otherCard.classList.toggle('is-selected', isActive);
otherCard.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

syncSelectedSchoolPrograms();
});
});

if (schoolOfferCards.length > 0) {
syncSelectedSchoolPrograms();
}

inquiryForms.forEach(form => {
form.addEventListener('submit', async event => {
event.preventDefault();

if (form.id === 'school-program-form' && !selectedProgramsInput?.value) {
window.alert('Please choose a school program option before submitting the form.');
return;
}

const submitButton = form.querySelector('button[type="submit"]');
const status = form.querySelector('.form-status');
const formData = new FormData(form);
const actionUrl = form.getAttribute('action');
const successUrl = form.dataset.successUrl;

if (!actionUrl) {
return;
}

if (submitButton) {
submitButton.disabled = true;
submitButton.textContent = 'Submitting...';
}

if (status) {
status.textContent = 'Thanks for submitting. We are sending your details now.';
status.classList.remove('is-error');
}

try {
const response = await fetch(actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
method: 'POST',
body: formData,
headers: {
Accept: 'application/json'
}
});

const result = await response.json();

if (!response.ok || result.success !== 'true') {
throw new Error('Submission failed');
}

if (status) {
status.textContent = 'Thanks for submitting. We are looking forward to connecting with you.';
}

form.reset();

if (form.id === 'school-program-form') {
syncSelectedSchoolPrograms();
schoolOfferCards.forEach(card => {
card.classList.remove('is-selected');
card.setAttribute('aria-pressed', 'false');
});
selectedProgramsInput.value = '';
selectedProgramsDisplay.value = '';
selectedProgramsSummary.textContent = 'No option selected yet.';
}

if (successUrl) {
window.location.href = new URL(successUrl, window.location.href).href;
}
} catch (error) {
if (status) {
status.textContent = 'We could not send your message right now. Please try again.';
status.classList.add('is-error');
}
} finally {
if (submitButton) {
submitButton.disabled = false;
submitButton.textContent = form.id === 'school-program-form' ? 'Submit School Request' : 'Send Inquiry';
}
}
});
});

});
