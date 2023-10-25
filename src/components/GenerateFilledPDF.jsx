import { PDFDocument} from 'pdf-lib';
import download from "downloadjs";

const GenerateFilledPDF = async function (formData) {
    // Fetch the PDF with form fields
    const formUrl = './files/Federal_Voter_Registration_ENG.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

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
    const citizen = form.getRadioGroup('citizen');
    const eighteenYearsOld = form.getRadioGroup('eighteen_years');
    const title =  form.getRadioGroup('salutation');
    const firstName = form.getTextField('first_name');
    const middleNames = form.getTextField('middle_names');
    const lastName = form.getTextField('last_name');
    const jrsrSuffix = form.getRadioGroup('suffix');
    const secondSuffix = form.getCheckBox('suffix_II');
    const thirdSuffix = form.getCheckBox('suffix_III');
    const fourthSuffix = form.getCheckBox('suffix_IV');

    const title2 =  form.getRadioGroup('salutation_2');
    const firstName2 = form.getTextField('first_name_2');
    const middleNames2 = form.getTextField('middle_names_2');
    const lastName2 = form.getTextField('last_name_2');
    const jrsrSuffix2 = form.getRadioGroup('suffix_2');
    const secondSuffix2 = form.getCheckBox('suffix_2_II');
    const thirdSuffix2 = form.getCheckBox('suffix_2_III');
    const fourthSuffix2 = form.getCheckBox('suffix_2_IV');

    const dobMonth = form.getTextField('dob_month');
    const dobDay = form.getTextField('dob_day');
    const dobYear = form.getTextField('dob_year');
    const phoneNumber = form.getTextField('telephone_number');
    const race = form.getTextField('race_ethnic_group');

    const homeAddress = form.getTextField('home_address');
    const aptNumber = form.getTextField('apt_lot_number');
    const city = form.getTextField('city');
    const state = form.getTextField('state');
    const zipcode = form.getTextField('zip_code');

    const mailAddress = form.getTextField('mail_address');
    const mailCity = form.getTextField('mail_city');
    const mailState = form.getTextField('mail_state');
    const mailZipcode = form.getTextField('mail_zip_code');

    const prevAddress = form.getTextField('prev_address');
    const prevAptNumber = form.getTextField('prev_apt_lot_number');
    const prevCity = form.getTextField('prev_city');
    const prevState = form.getTextField('prev_state');
    const prevZipcode = form.getTextField('prev_zip_code');

    const idNumber = form.getTextField('id_number');
    const politicalParty = form.getTextField('choice_of_party');

    // -----------Fill in the pdf fields--------------------------
    // (1) Personal Information
    //Citizen and age
    citizen.select('yes');
    eighteenYearsOld.select('yes');

    //Current Name
    if(formData.title) {
        title.select(formData.title);
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
    if(formData.prev_title){
        title2.select(formData.prev_title);
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
    //download(pdfBytes, `national_voter_registration_form_${formData.state}.pdf`, "application/pdf");
    //open(URL.createObjectURL(new Blob(pdfBytes, {type: "application/pdf"})));
    var blobURL = URL.createObjectURL(new Blob([pdfBytes], {type: 'application/pdf'}));
    window.open(blobURL);
}

export default GenerateFilledPDF;