


  // content_script.js


  const fillElements = async ()=> {
    console.log("fillElements")
  
    let customDomains = document.querySelectorAll('#publish-targets .custom-domains');
  
    
    customDomains.forEach(async (customDomain, index) => {
  
      let linkElement = customDomain.querySelector('.published-page-link');
  
      let childLock = customDomain.querySelector('#lock-' +index);
      let childUnLock = customDomain.querySelector('#unlock-' + index);
    
  
      let response = await getItem(globalThis.collectionExEvent._id, linkElement.getAttribute("href"));
  
      
      childUnLock.classList.remove("f3_hidden");
      childLock.classList.add("f3_hidden");
  
      if (response.count > 0)
      {
          let item = response.items[0];
          if (item.domain == linkElement.getAttribute("href") && !item.allow)
          {
            document.getElementById('toggle-' + index).click();
  
            let childKitCheckbox = customDomain.querySelector('.kit-checkbox');
  
            let childTextArea = customDomain.querySelector('#textarea-' + index);
            
            childKitCheckbox.classList.add("disabled");
            childKitCheckbox.classList.remove("checked");
            childTextArea.classList.remove("f3_hidden");
            childTextArea.value = item.comment;
  
            childLock.classList.remove("f3_hidden");
            childUnLock.classList.add("f3_hidden");
              
          }
        }
  
  
    });
    
  }
  
  
  const appendElements = ()  => {
  
  
    console.log("appendElements")
      setTimeout(() => {
        
        // Find all elements with class "custom-domains" inside the element with id "publish-targets"
        let parentElements = document.querySelectorAll('#publish-targets .custom-domains');
       
        parentElements.forEach((parentElement, index) => {
            // Check if elements already exist
            let existingToggle = document.getElementById('toggle-' + index);
            let existingTextarea = document.getElementById('textarea-' + index);
           
            if (!existingToggle && !existingTextarea) {
            
                // Create a new 'li' element
                let newListItem = document.createElement('li');
  
                let divContainer = document.createElement('div');
                divContainer.className = 'f3_container-flex'; 
  
  
                let divContent= document.createElement('div');
                divContent.className = 'f3_content-side'; 
  
                let divContentLock= document.createElement('div');
                divContentLock.className = 'f3_content-locks'; 
  
                let lock = document.createElement('div');
                lock.className = 'f3_lock f3_hidden';  // set class
                lock.id = 'lock-' + index;  // set unique id
  
                let unLock = document.createElement('div');
                unLock.className = 'f3_unlock f3_hidden';  // set class
                unLock.id = 'unlock-' + index;  // set unique id
  
                let label = document.createElement('label');
                label.id = 'label-' + index;  // set unique id
                label.className = 'f3-inputs f3_label';  // set class
                label.textContent = "Block Deploy *";
  
  
                let labelChbox = document.createElement('label');
                labelChbox.id = 'labelChbox-' + index;  // set unique id
                labelChbox.className = 'f3_switch-wrapper';  // set class
  
                let divChbox = document.createElement('div');
                divChbox.id = 'divChbox-' + index;  // set unique id
                divChbox.className = 'f3_switch';  // set class
  
                //<label class="fs_switch-wrapper"><input type="checkbox" class="fs_switch-checkbox"> <div class="fs_switch"></div></label>
  
                // Create a toggle (checkbox)
                let toggle = document.createElement('input');
                toggle.type = 'checkbox';
                toggle.id = 'toggle-' + index;  // set unique id
                toggle.className = 'f3-inputs f3_switch-checkbox';  // set class
  
                labelChbox.appendChild(toggle);
                labelChbox.appendChild(divChbox);
  
                // Create a textarea
                let textarea = document.createElement('textarea');
                textarea.id = 'textarea-' + index;  // set unique id
                textarea.className = 'f3-inputs f3_code f3_hidden';  // set class
                textarea.placeholder = "Write a message to inform why";
  
                // Append the toggle and textarea to the new 'li' element
           
                
               
                newListItem.appendChild(divContainer);//li
  
                divContentLock.appendChild(unLock);
                divContentLock.appendChild(lock);
                divContentLock.appendChild(label);
            
                divContent.appendChild(divContentLock);
                divContent.appendChild(labelChbox);
               
                divContainer.appendChild(divContent);
  
                newListItem.appendChild(textarea);
  
                // Append the new 'li' element to the parent
                parentElement.appendChild(newListItem);
  
                
                //
                //Handlers
                //
                document.getElementById(toggle.id).addEventListener('change', async function() {
  
                  let parentCustomDomain = this.closest('.custom-domains');
                  let childKitCheckbox = parentCustomDomain.querySelector('.kit-checkbox');
  
                  let childTextArea = parentCustomDomain.querySelector('#' + textarea.id);
                  let childLock = parentCustomDomain.querySelector('#' + lock.id);
                  let childUnLock = parentCustomDomain.querySelector('#' + unLock.id);
                  
                  if (this.checked) {
  
                    childKitCheckbox.classList.add("disabled");
                    childKitCheckbox.classList.remove("checked");
                    childTextArea.classList.remove("f3_hidden");
                    childLock.classList.remove("f3_hidden");
                    childUnLock.classList.add("f3_hidden");
                    childTextArea.value = "";
                 
        
                  } else {
  
                    let linkElement = parentCustomDomain.querySelector('.published-page-link');
                    let toggleElement = parentCustomDomain.querySelector('.f3_switch-checkbox');
  
  
                    let item = {
  
                      "staging" : true,
                      "fields" :{
                        "name" : linkElement.getAttribute("href") + "-" + Date.now(),
                        "domain" : linkElement.getAttribute("href"),
                        "user" : globalThis.site.user.email,
                        "allow" : !toggleElement.checked,
                        "comment" : "",
                        "_archived":false,
                        "_draft":true
                      }
                      
                    }
  
                    childKitCheckbox.classList.remove("disabled")
                    childKitCheckbox.classList.remove("checked");
                    childTextArea.classList.add("f3_hidden");
                    childTextArea.value = "";
                    childLock.classList.add("f3_hidden");
                    childUnLock.classList.remove("f3_hidden");
    
  
                    let response = await createItem(globalThis.collectionExEvent._id, item);
                   
  
                  }
                });
  
  
                document.getElementById(textarea.id).addEventListener('change', async function() {
  
                  let parentCustomDomain = this.closest('.custom-domains');
                  let linkElement = parentCustomDomain.querySelector('.published-page-link');
                  let toggleElement = parentCustomDomain.querySelector('.f3_switch-checkbox');
  
                 
                   let item = {
                    "staging" : true,
                      "fields" :{
                       
                        "name" : linkElement.getAttribute("href") + "-" + Date.now(),
                        "domain" : linkElement.getAttribute("href"),
                        "user" : globalThis.site.user.email,
                        "allow" : !toggleElement.checked,
                        "comment" : this.value,
                        "_archived":false,
                        "_draft":true
                      }
                    }
  
                    let response = await createItem(globalThis.collectionExEvent._id, item);
  
  
                });
  
            }
  
            
        });
  
        fillElements();
  
    }, 
    1000);
  }
  
  
  const publishHandler = () => {
   console.log("publishHandler")
    document.querySelector('[data-automation-id="publish-menu-button"]').addEventListener('click', function() {
        appendElements();
      
    });
  
  }
  
  const getCSRFToken = () =>
    document.head.querySelector('meta[name="_csrf"]')?.getAttribute("content") ||
    "";
  
  const createCollection = async ()=> {
  
    try 
    {
        // The headers for the request
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-XSRF-Token", getCSRFToken())
  
        // The data for the new collection
        let payload = JSON.stringify({
            "name": "exEvents",
            "slug": "exevents",
            "singularName": "Extension Events",
            "fields": [
                {
                  "name": "domain",
                  "type": "PlainText"
                },
                {
                  "name": "user",
                  "type": "PlainText"
                
                },
                {
                  "name": "allow",
                  "type": "Bool"
                },
                {
                  "name": "comment",
                  "type": "PlainText"
                
                },
            ]
        });
  
        // The options for the fetch function
        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: payload,
            redirect: 'follow'
        };
  
        let response = await fetch("https://webflow.com/api/sites/" + getSiteName() + "/collectionPage", requestOptions);
          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        return data;
    
      } catch (error) {
    
        console.error('Fetch failed to get data:', error);
        return [];
        
      }
  
  
  }
  
  const createItem = async (collectionId, item)=> {
  
    try 
    {
      // The headers for the request
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("X-XSRF-Token", getCSRFToken())
  
      // The data for the new collection
      let body = JSON.stringify(item);
  
      // The options for the fetch function
      let requestOptions = {
          method: 'POST',
          headers: headers,
          body: body,
          redirect: 'follow'
      };
  
      let response = await fetch("https://webflow.com/api/v1/collections/"+ collectionId + "/items", requestOptions);
          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        return data;
    
      } catch (error) {
    
        console.error('Fetch failed to get data:', error);
        return [];
        
      }
  
  
  }
  
  const getItem = async (collectionId, text) => {
  
    try 
    {
        // The headers for the request
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-XSRF-Token", getCSRFToken())
  
  
        // The options for the fetch function
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
  
  
        let response = await fetch("https://webflow.com/api/v1/collections/" + collectionId + "/items?target=staging&offset=0&limit=1&sort%5B%5D=-created-on&format=withoutHeavyFields&text=" + text, requestOptions);
          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        return data;
    
      } catch (error) {
    
        console.error('Fetch failed to get data:', error);
        return [];
        
      }
  
  
  }
  
  const getAllItems = async (collectionId) => {
  
    try 
    {
        // The headers for the request
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-XSRF-Token", getCSRFToken())
  
  
        // The options for the fetch function
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
  
  
        let response = await fetch("https://webflow.com/api/v1/collections/" + collectionId + "/items?target=staging&offset=10&limit=10&sort%5B%5D=-created-on&format=withoutHeavyFields", requestOptions);
          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        return data;
    
      } catch (error) {
    
        console.error('Fetch failed to get data:', error);
        return [];
        
      }
  
  
  }
  
  const getCollections = async (databaseId) => {
  
    try 
    {
  
      // The headers for the request
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("X-XSRF-Token", getCSRFToken())
  
  
      // The options for the fetch function
      let requestOptions = {
          method: 'GET',
          headers: headers,
          redirect: 'follow'
      };
  
  
      let response = await fetch("https://webflow.com/api/v1/databases/" + databaseId + "/collections", requestOptions);
          
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let data = await response.json();
  
      return data;
  
    } catch (error) {
  
      console.error('Fetch failed to get data:', error);
      return [];
      
    }
  }
  
  const deleteItems = async (collectionId, payload) => {
  
    try 
    {
        // The headers for the request
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-XSRF-Token", getCSRFToken())
  
        let body = JSON.stringify(payload);
  
        // The options for the fetch function
        let requestOptions = {
            method: 'DELETE',
            headers: headers,
            body: body,
            redirect: 'follow'
        };
  
  
        let response = await fetch("https://webflow.com/api/v1/collections/" + collectionId + "/items", requestOptions);
          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        return data;
    
      } catch (error) {
    
        console.error('Fetch failed to get data:', error);
        return [];
        
      }
  
  
  }
  
  const getSiteName = () => {
  
    let url = window.location.href;
    let siteName = "";
    if (url.includes("https://webflow.com/design/")) {
       siteName = url.split("https://webflow.com/design/")[1].split("/")[0];
    } else {
      console.log("The current URL does not match the expected format.");
    }
  
    return siteName;
  }
  
  
  
  const getSite = async () => {
  
    const requestOptions = {
      method: 'GET', // Or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as needed, such as authorization tokens
      },
      // Include a body if needed. Make sure to stringify if it's an object:
      // body: JSON.stringify({ key: 'value' }),
    };
  
    try {
  
      let response = await fetch("https://webflow.com/api/sites/" + getSiteName(), requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let data = await response.json();
  
      return data;
  
    } catch (error) {
      console.error('Fetch failed to get data:', error);
    }
  
  
  }
  
  const init = async () => {
  
    globalThis.site = await getSite();

    globalThis.collections = await getCollections(globalThis.site.site.database); 
  
    globalThis.collectionExEvent = globalThis.collections.collections.find(e => e.name == "exEvents");
  
    if (collectionExEvent == null)
    {
      globalThis.collectionExEvent = await createCollection();
    }
  
    if (globalThis.collectionExEvent.totalNumberOfItems > 10)
    {
      //delete last 10
      let resp = await getAllItems(globalThis.collectionExEvent._id);

      let ids = resp.items.map(item => item._id);

      await deleteItems(globalThis.collectionExEvent._id, {"itemIds" : ids })
  
    }
  
  }
  
  
  
  init();
  setTimeout(publishHandler, 5000);
  //setInterval(app, 5000);
  
  