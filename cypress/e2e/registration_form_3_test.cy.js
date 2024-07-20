beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


//BONUS TASK: add visual tests for registration form 3
//Task list:
describe('Section 1: Visual tests', () => {
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    
    it('Country dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#country').select(1).screenshot('Country drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Country dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has no text
        cy.get('#country').find('option').eq(0).should('have.text', '')
        
        // Advanced level how to check the content of the Country dropdown
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])
    })
})

    it('List of cities changes depending on the selected Country', () => {
        // Make sure that the list of cities changes depending on the choice of country by seeing if each country selected has a seperate list of cities attached to it
        //Select the first country 
        cy.get('#country').select(1)
        //Check that the list of cities matches the Country-s intended list
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Malaga', 'string:Madrid', 'string:Valencia', 'string:Corralejo'])
    
        })

        //Select the second country 
        cy.get('#country').select(2)
        //Check that the list of cities matches the Country-s intended list
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Tallinn', 'string:Haapsalu', 'string:Tartu'])

        })

        //Select the third country
        cy.get('#country').select(3)
        //Check that the list of cities matches the Country-s intended list
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Vienna', 'string:Salzburg', 'string:Innsbruck'])
        
        })  
})

    it('If city is already chosen and country is updated, then city choice should be removed', () => {
        //Select a new country and check if the dropdown has new values


        cy.get('#country').select(2)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('not.have.text', 'Malaga')
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Tallinn', 'string:Haapsalu', 'string:Tartu'])

        })

        
        cy.get('#country').select(3)
    
        // Check  that the city is removed
        //cy.get('#city').should('have.value', [])

})


it('Check that checkbox list is correct', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="checkbox"]').should('have.length', 2)

    // Verify labels of the checkboxes buttons
    cy.get('input[type="checkbox"]').next().eq(0).should('have.text','')
    cy.get('input[type="checkbox"]').eq(0).parent().should('contain.text', 'Accept our privacy policy')
    cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy')

    
    // Verify the label of the button with the link
    cy.get('button').should('contain.text', 'Accept our cookie policy')
   
    //Verify default state of checkboxes
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

})

    it('Verify the links of the checkboxes', () => {
        // Check that the second checkbox has an associated link with correct href
        cy.get('input[type="checkbox"]').eq(1).next('button').find('a')
            .should('have.attr', 'href', 'cookiePolicy.html')
            .and('contain.text', 'Accept our cookie policy');

        // Optional: Verify that the link is visible
        cy.get('input[type="checkbox"]').eq(1).next('button').find('a')
            .should('be.visible');

        // Get navigation element, find its first child, check the link content and click it
        //cy.get('nav').children().eq(0).should('be.visible')
        //.and('have.attr', 'href', 'registration_form_1.html')
        cy.get('input[type="checkbox"]').eq(1).next('button').find('a')
        .should('have.attr', 'href', 'cookiePolicy.html')
        .click()
            
        // Check that currently opened URL is correct
        cy.url().should('contain', '/cookiePolicy.html')

        //Check that the page contains the policy
        cy.contains('cookie').should('be.visible');
            
        // Go back to previous page
        cy.go('back')
        //Check that it went back to the previous page
        cy.url().should('include', 'registration_form_3.html');
        cy.log('Back to the  registration form 3 page')

    });
        it('Verify that e-mail type', () => {
            cy.get('input[name="email"]').should('have.attr', 'type', 'email');

        });

        it('Accepts a valid email address', () => {
            // Enter a valid email address
            cy.get('input[name="email"]').type('validemail@example.com');
    
            // Assert that the email input has the valid class
            cy.get('input[name="email"]').should('have.class', 'ng-valid-email');
            
            // Optional: Check if the form can be submitted (assuming there is a submit button)
            cy.get('input[name="email"]').blur(); // Remove focus to trigger validation
            cy.get('input[name="email"]').should('not.have.class', 'ng-invalid');
        });
    
        it('Rejects an invalid email address', () => {
            // Enter an invalid email address
            cy.get('input[name="email"]').type('invalidemail');
    
            // Assert that the email input has the invalid class
            cy.get('input[name="email"]').should('not.have.class', 'ng-valid-email');
            
            // Optional: Check if the form cannot be submitted (assuming there is a submit button)
            cy.get('input[name="email"]').blur(); // Remove focus to trigger validation
            cy.get('input[name="email"]').should('have.class', 'ng-invalid');
        });
    
        it('Shows error for empty email field', () => {
            // Leave the email field empty
            cy.get('input[name="email"]').focus().blur(); // Focus and blur to trigger validation
    
            // Assert that the email input has the invalid class
            cy.get('input[name="email"]').should('have.class', 'ng-invalid-required');
        });


});


describe('Section 2: Functional tests', () => {
    it('All fields are filled in + corresponding assertions', () => {
            // Add test steps for filling in ALL fields
            cy.get("input[name='name']").type('Teet')
            cy.get("input[name='email']").type('teettester@gmail.com')
            cy.get('#country').select(1)
            cy.get('#city').select(1)
            cy.get('input[type="radio"]').eq(0).check()
            cy.get("input[name='birthday']").type('2011-11-11')
            cy.get('input[type="checkbox"]').eq(0).click()
            cy.get('input[type="checkbox"]').eq(1).click()
            
            

    
            // Assert that submit button is enabled
            cy.get('input[type="submit"]').should('be.enabled')
            // no need for that cy.contains('button[type="submit"]', 'Submit file').should('be.enabled');
            
            
            // Assert that after submitting the form system show successful message
            cy.get('input[type="submit"][ng-disabled="myForm.$invalid"]').click();
            // Check that currently opened URL is correct
            cy.url().should('contain', 'upload')
            //Check that the page contains the policy
            cy.contains('Submission').should('be.visible');
    
    
        })
        it('Only mandatory fields are filled in + corresponding assertions', () => {
            // Add test steps for filling in ALL MANDATORY fields
            //cy.get("input[name='name']").type('Teet')
            cy.get("input[name='email']").type('teettester@gmail.com')
            cy.get('#country').select(1)
            cy.get('#city').select(1)
            //cy.get('input[type="radio"]').eq(0).check()
            cy.get("input[name='birthday']").type('2011-11-11')
            cy.get('input[type="checkbox"]').eq(0).click()
            //cy.get('input[type="checkbox"]').eq(1).click()
            
            

    
            // Assert that submit button is enabled
            cy.get('input[type="submit"]').should('be.enabled')
            // no need for that cy.contains('button[type="submit"]', 'Submit file').should('be.enabled');
            
            
            // Assert that after submitting the form system show successful message
            cy.get('input[type="submit"][ng-disabled="myForm.$invalid"]').click();
            // Check that currently opened URL is correct
            cy.url().should('contain', '/upload')
            //Check that the page contains the policy
            cy.contains('Submission').should('be.visible');
    

        })


        it('Only mandatory fields are absent + corresponding assertions, filled with a function', () => {
        // example, how to use function, which fills in all mandatory data    
        // in order to see the content of the function, scroll to the end of the file
        inputValidData('johnDoe')

        // Assert that submit button is enabled
        cy.get('input[type="submit"]').should('not.be.enabled')
    });
});



    describe('File Upload Test', () => {
            it('Should upload a file successfully', () => {
              // The name of the file to upload
              const fileName = 'car.jpg'; // Ensure this file is in the cypress/fixtures folder
          
              // Visit the page with the file upload input
              cy.visit('cypress/fixtures/registration_form_3.html'); // Replace with the actual URL or path
          
              // Select the file upload input and attach the file
              cy.get('input[type="file"]').attachFile(fileName);
          
              // Add assertions as needed
              cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\car.jpg');
            });
          });






function inputValidData(username) {
    //cy.log('Username will be filled')
    //cy.get('input[data-testid="user"]').type(username)
    cy.get("input[name='email']").type('teettester@gmail.com')
    cy.get("input[name='name']").type(username)
}


 /*
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content done
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country done
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */