// generator.js - Functions to generate HTML for tech stack and certificates

import { techStackData, certificatesData } from './data.js';

// Function to initialize everything
function initializeContent() {
  renderTechStack();
  renderCertificates();
  setupLazyLoading();
}

// Tech Stack Generator Functions
function renderTechStack() {
  // For mobile view
  const mobileContainer = document.querySelector('.block.md\\:hidden.space-y-6');
  if (mobileContainer) {
    techStackData.categories.forEach(category => {
      // Create category heading
      const categoryHeading = document.createElement('div');
      categoryHeading.className = 'mb-8';
      categoryHeading.innerHTML = `
        <h3 class="wow animate__animated animate__fadeInUp text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 px-4 py-3 mb-3 rounded-t-lg">
          ${category.name}
        </h3>
      `;

      // Create skill cards for this category
      category.skills.forEach(skill => {
        const skillCard = createMobileSkillCard(skill);
        categoryHeading.appendChild(skillCard);
      });

      mobileContainer.appendChild(categoryHeading);
    });
  }

  // For desktop view (table)
  const tableBody = document.getElementById('tech-desktop-table');
  if (tableBody) {
    techStackData.categories.forEach(category => {
      let tableHead = createDesktopSkillHead(category)
      tableBody.insertAdjacentHTML('beforeend', tableHead)
      category.skills.forEach(skill => {
        const skillRow = createDesktopSkillRow(skill);
        tableBody.appendChild(skillRow);
      });
    });
  }
}

function createMobileSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'wow animate__animated animate__fadeInUp bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden shadow-sm';

  card.innerHTML = `
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <img src="${skill.icon}" loading="lazy" alt="${skill.name}" title="${skill.name}" class="w-6 h-6" />
        <h4 class="font-medium text-gray-900 dark:text-white">${skill.name}</h4>
      </div>
      <div class="mt-2">
        <span class="px-2 py-1 text-xs font-medium rounded-full bg-${skill.proficiencyColor}-100 text-${skill.proficiencyColor}-800 dark:bg-${skill.proficiencyColor}-900 dark:text-${skill.proficiencyColor}-300">
          ${skill.proficiency}
        </span>
      </div>
    </div>
    <div class="px-4 py-3">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features:</p>
      <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
        ${skill.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Projects:</p>
      <ul class="space-y-2 text-sm">
        ${skill.projects.map(project => `
          <li class="flex items-center gap-1 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
            </svg>
            <a href="${project.url}" target="_blank" class="hover:underline underline-offset-2">${project.name}</a>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  return card;
}

function createDesktopSkillRow(skill) {
  const row = document.createElement('tr');
  row.className = 'wow animate__animated animate__fadeInLeft bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200';
  row.setAttribute('data-wow-duration', '2s')

  row.innerHTML = `
    <th scope="row" class="flex flex-row items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <img src="${skill.icon}" loading="lazy" alt="${skill.name}" title="${skill.name}" class="w-6 h-6" />
      ${skill.fullName}
    </th>
    <td class="px-6 py-4">
      <span class="px-2 py-1 text-xs font-medium rounded-full bg-${skill.proficiencyColor}-100 text-${skill.proficiencyColor}-800 dark:bg-${skill.proficiencyColor}-900 dark:text-${skill.proficiencyColor}-300">
        ${skill.proficiency}
      </span>
    </td>
    <td class="px-6 py-4 text-left">
      <ul class="list-disc list-inside">
        ${skill.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul class="list-outside">
        ${skill.projects.map(project => `
          <li class="flex flex-row items-center gap-1 text-blue-500 hover:underline underline-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
              <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
            </svg>
            <a target="_blank" href="${project.url}">${project.name}</a>
          </li>
        `).join('')}
      </ul>
    </td>
  `;

  return row;
}

function createDesktopSkillHead(category) {
  let html = `<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-md">
                    <tr>
                    <th scope="col" class="px-6 py-3">${category.name}</th>
                    <th scope="col" class="px-6 py-3">Proficiency</th>
                    <th scope="col" class="px-6 py-3">Key Features</th>
                    <th scope="col" class="px-6 py-3">Projects</th>
                    </tr>
                </thead>`

  return html;
}

// Certificate Generator Functions
function renderCertificates() {
  const certificatesContainer = document.querySelector('.certificates-cards');
  if (certificatesContainer) {
    // Clear existing certificates if any
    certificatesContainer.innerHTML = '';

    // Generate certificate cards
    certificatesData.forEach(cert => {
      const certCard = createCertificateCard(cert);
      certificatesContainer.appendChild(certCard);
    });
  }
}

function createCertificateCard(cert) {
  const card = document.createElement('div');
  card.className = 'certificates-card flex flex-col justify-between items-center gap-3 bg-brand-primary p-5 border-2 border-brand-neutral rounded-3xl shadow-btn max-w-80';

  card.innerHTML = `
    <div class="cer-picture w-full h-full">
      <div class="spinner flex justify-center items-center w-full h-full min-h-32 place-items-center">
        <div role="status">
          <svg aria-hidden="true" class="inline w-8 h-8 text-white/60 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <img data-src="${cert.imagePath}" class="lazy opacity-0 transition-opacity duration-300" alt="${cert.imageAlt}" />
    </div>
    <div class="cer-context h-full w-full flex flex-col gap-2 justify-between">
      <div class="flex flex-col gap-2 flex-1">
        <p class="cer-earnDate text-sm">Earned on <b>${cert.earnedOn}</b></p>
        <div class="cer-logo w-20 py-1 px-2 bg-white rounded-full">
          <img src="${cert.providerLogo}" alt="${cert.provider} Logo" />
        </div>
        <a title="verify link" href="${cert.verifyLink}" class="cer-title font-mont-bold leading-5 hover:underline" target="_blank">
          ${cert.title}
        </a>
      </div>
      <div>
        <p class="cer-info text-xs">offered by <b>${cert.provider}</b> in <b>${cert.platform}</b></p>
        <a href="${cert.downloadPath}" download="${cert.downloadPath.split('/').pop()}" class="cer-download" target="_blank">
          <button class="button w-full mt-2 font-mont-med text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            Download Certificate
          </button>
        </a>
      </div>
    </div>
  `;

  return card;
}

// Setup lazy loading for certificate images
function setupLazyLoading() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;

          // Show image after it's loaded
          img.onload = () => {
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');

            // Hide spinner when image loads
            const spinner = img.parentElement.querySelector('.spinner');
            if (spinner) {
              spinner.style.display = 'none';
            }
          };

          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100');
    });
  }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeContent);

export { initializeContent, renderTechStack, renderCertificates };