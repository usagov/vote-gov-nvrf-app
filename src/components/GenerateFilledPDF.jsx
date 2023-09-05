import { PDFDocument} from 'pdf-lib';
import download from "downloadjs";
import fs from "fs/promises";

const GenerateFilledPDF = async function (formData) {
    console.log(formData);

    //const fs = require('fs/promises'); //note fs/promises, not fs here
    const pdfData = await fs.readFile('national_voter_registration_form_.pdf');
    const pdfDoc = await PDFDocument.load(pdfData);
    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    //Optional - print the names of all form fields
    /*const fields = form.getFields()
    fields.forEach(field => {
    const type = field.constructor.name
    const name = field.getName()
    console.log(`${type}: ${name}`)
    })*/

    //-------- Get PDF Fields by machine name ------------------
    const title =  form.getRadioGroup('salutation');
    const title2 = form.getRadioGroup('salutation_2')
    const firstName = form.getTextField('First Name');
    const middleNames = form.getTextField('Middle Names');
    const lastName = form.getTextField('Last Name');
    const jrsrSuffix = form.getRadioGroup('suffix');//check
    const secondSuffix = form.getCheckBox('II');
    const thirdSuffix = form.getCheckBox('III');
    const fourthSuffix = form.getCheckBox('IV');

    const title3 =  form.getRadioGroup('salutation_3');
    const title4 = form.getRadioGroup('salutation_4')
    const firstName2 = form.getTextField('First Name_2');
    const middleNames2 = form.getTextField('Middle Names_2');
    const lastName2 = form.getTextField('Last Name_2');
    const jrsrSuffix2 = form.getRadioGroup('suffix_2');
    const secondSuffix2 = form.getCheckBox('II_2');
    const thirdSuffix2 = form.getCheckBox('III_2');
    const fourthSuffix2 = form.getCheckBox('IV_2');

    const dobMonth = form.getTextField('Month');
    const dobDay = form.getTextField('Day');
    const dobYear = form.getTextField('Year');
    const phoneNumber = form.getTextField('Telephone Number optional');
    const race = form.getTextField('Race or Ethnic Group see item 8 in the instructions for your State');

    const homeAddress = form.getTextField('Home Address');
    const aptNumber = form.getTextField('Apt or Lot');
    const city = form.getTextField('CityTown');
    const state = form.getTextField('State');//check
    const zipcode = form.getTextField('Zip Code');

    const mailAddress = form.getTextField('Address Where You Get Your Mail If Different From Above');
    const mailCity = form.getTextField('CityTown_2');
    const mailState = form.getTextField('State_2');
    const mailZipcode = form.getTextField('Zip Code_2');

    const prevAddress = form.getTextField('Street or route and box number');
    const prevAptNumber = form.getTextField('Apt or Lot_2');
    const prevCity = form.getTextField('CityTownCounty');
    const prevState = form.getTextField('State_3');
    const prevZipcode = form.getTextField('Zip Code_3');

    const idNumber = form.getTextField('undefined_3');
    const politicalParty = form.getTextField('Choice of Party see item 7 in the instructions for your State');

    // -----------Fill in the pdf fields--------------------------
    // (1) Personal Information
    // Logic for title select has to be seperated into two radio groups
    if (formData.title == 'Mr' || formData.title == "Mrs"){
        title.select(formData.title);
    } else if (formData.title == 'Miss' || formData.title == 'Ms') {
        title2.select(formData.title);
    }

    firstName.setText(formData.first_name);
    middleNames.setText(formData.middle_name);
    lastName.setText(formData.last_name);

    //Dropdown to checkbox/radio logic for suffix
    if (formData.suffix === 'II') {
        secondSuffix.check();
    } else if (formData.suffix === 'III') {
        thirdSuffix.check();
    } else if (formData.suffix === 'IV') {
        fourthSuffix.check();
    } else if (formData.suffix === 'Jr.') {
        jrsrSuffix.select('Jr');
    } else if (formData.suffix === 'Sr.') {
        jrsrSuffix.select('Sr');
    }

    //Previous Name
    if (formData.prev_title === 'Mr') {
        title3.select("Mr_2");
    } else if (formData.prev_title === "Mrs") {
        title3.select("Mrs_2");
    } else if (formData.prev_title === "Miss"){
        title4.select("Miss_2");
    } else if (formData.prev_title === "Ms"){
        title4.select("Ms_2");
    }

    firstName2.setText(formData.prev_first_name);
    middleNames2.setText(formData.prev_middle_name);
    lastName2.setText(formData.prev_last_name);

    //Dropdown to checkbox/radio logic for suffix
    if (formData.prev_suffix === 'II') {
        secondSuffix2.check();
    } else if (formData.prev_suffix === 'III') {
        thirdSuffix2.check();
    } else if (formData.prev_suffix === 'IV') {
        fourthSuffix2.check();
    } else if (formData.prev_suffix === 'Jr.') {
        jrsrSuffix2.select('Jr_2');
    } else if (formData.prev_suffix === 'Sr.') {
        jrsrSuffix2.select('Sr_2');
    }

    //Date of Birth, Phone, Race
    dobMonth.setText(formData.date_of_birth_month);
    dobDay.setText(formData.date_of_birth_day);
    dobYear.setText(formData.date_of_birth_year);
    phoneNumber.setText(formData.phone_number);
    race.setText(formData.race);

    //(2) Addresses
    //Home
    homeAddress.setText(formData.street_address);
    aptNumber.setText(formData.apt_num);
    city.setText(formData.city);
    state.setText(formData.state);
    zipcode.setText(formData.zip_code);
    //Mail
    mailAddress.setText(`${formData.mail_street_address} ${formData.mail_apt_num}`);
    mailCity.setText(formData.mail_city);
    mailState.setText(formData.mail_state);
    mailZipcode.setText(formData.mail_zip_code);
    //Previous
    prevAddress.setText(formData.prev_street_address);
    prevAptNumber.setText(formData.prev_apt_num);
    prevCity.setText(formData.prev_city);
    prevState.setText(formData.prev_state);
    prevZipcode.setText(formData.prev_zip_code);

    //(3) Identification
    idNumber.setText(formData.id_number);

    //(4) Political Party
    politicalParty.setText(formData.party_choice);

    //-------------End PDF Fill---------------

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, `national_voter_registration_form_${formData.state}.pdf`, "application/pdf");
}

export default GenerateFilledPDF;