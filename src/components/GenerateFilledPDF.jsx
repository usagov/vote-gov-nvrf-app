import { PDFDocument} from 'pdf-lib';

const GenerateFilledPDF = async function (formData,pagesKept) {
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
    const suffix = form.getRadioGroup('suffix');

    const title2 =  form.getRadioGroup('salutation_2');
    const firstName2 = form.getTextField('first_name_2');
    const middleNames2 = form.getTextField('middle_names_2');
    const lastName2 = form.getTextField('last_name_2');
    const suffix2 = form.getRadioGroup('suffix_2');

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
    if(formData.suffix){
        suffix.select(formData.suffix);
    }

    //Previous Name
    if(formData.prev_title){
        title2.select(formData.prev_title);
    }
    firstName2.setText(formData.prev_first_name);
    middleNames2.setText(formData.prev_middle_name);
    lastName2.setText(formData.prev_last_name);

    //Dropdown to checkbox/radio logic for suffix
    console.log(formData.prev_suffix)
    if(formData.prev_suffix){
        suffix2.select(formData.prev_suffix);
    }

    //Date of Birth, Phone, Race
    dobMonth.setText(formData.date_of_birth_month);
    dobDay.setText(formData.date_of_birth_day);
    dobYear.setText(formData.date_of_birth_year);
    phoneNumber.setText(formData.phone_number);
    race.setText(formData.race);

    //(2) Addresses
    //Home
    const currentAddress = formData.street_address + formData.apt_num + formData.city + formData.zip_code;
    //check if anything other than default state selection is filled out
    if (currentAddress) {
    homeAddress.setText(formData.street_address);
    aptNumber.setText(formData.apt_num);
    city.setText(formData.city);
    state.setText(formData.state);
    zipcode.setText(formData.zip_code);
    }

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
    //Utah special case
    if(formData.state === "Utah" && formData.ssn_number) {
        idNumber.setText("None, " + formData.ssn_number);
    //No id or ssn
    } else if ((formData.id_number === '') && (formData.ssn_number === '')) {
        idNumber.setText("None");
    //Both id and ssn
    } else if ((formData.id_number != '') && (formData.ssn_number != '')) {
        idNumber.setText(formData.id_number + ", " + formData.ssn_number);
    //Id or ssn
    } else {
        idNumber.setText(formData.id_number + formData.ssn_number);
    }

    //(4) Political Party
    politicalParty.setText(formData.party_choice);

    //-------------End PDF Fill---------------

    //Remove unneccessary pages
    let shift = 0;
    const totalPages = pdfDoc.getPageCount();
    let pageCount = totalPages;
    const pagesKeptArray = pagesKept.split(',');
    for(let i = 0; i < totalPages; i++){
        /*console.log(`i: ${i}`);
        console.log(`Total page count: ${pageCount}`);
        console.log(pagesKeptArray.includes(i));*/
        if(!pagesKeptArray.includes(i.toString())){
            pdfDoc.removePage(i - shift);
            // console.log("page removed");
            shift++;
            pageCount--;
        }
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    //download(pdfBytes, `national_voter_registration_form_${formData.state}.pdf`, "application/pdf");
    //open(URL.createObjectURL(new Blob(pdfBytes, {type: "application/pdf"})));
    var blobURL = URL.createObjectURL(new Blob([pdfBytes], {type: 'application/pdf'}));
    window.open(blobURL);
}

export default GenerateFilledPDF;