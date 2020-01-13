import { Injectable } from '@angular/core';
import validator from 'validator';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  constructor() {}

  codeIsValid(code) {
    if (!code) {
      alert('کد نمیتواند خالی باشد!');
      return false;
    }
    if (!validator.isNumeric(code)) {
      alert('برای وارد کردن کد فقط از اعداد انگلیسی استفاده کنید!');
      return false;
    }
    if (code.length < 5 || code.length > 9) {
      alert('کد بین 5 تا 9 رقم باشد!');
      return false;
    } else return true;
  }

  titleIsValid(title) {
    if (!title) {
      alert('عنوان نمیتواند خالی باشد!');
      return false;
    }
    const regex = /^[\u0600-\u06FF\s]+$/;
    if (regex.exec(title) === null) {
      alert('عنوان را با حروف فارسی وارد کنید!');
      return false;
    } else return true;
  }

  boardOfTrustIsValid(boardOfTrust) {
    if (!boardOfTrust) {
      alert('هیات امنا نمیتواند خالی باشد!');
      return false;
    }
    const regex = /^[\u0600-\u06FF\s]+$/;
    if (regex.exec(boardOfTrust) === null) {
      alert('هیات امنا را با حروف فارسی وارد کنید!');
      return false;
    } else return true;
  }

  isEnableIsValid(isEnable) {
    if (!isEnable) {
      alert('مدرسه را فعال کنید!');
      return false;
    } else return true;
  }

  nationalCodeIsValid(nationalCode) {
    if (!nationalCode) {
      alert('کد ملی نمیتواند خالی باشد!');
      return false;
    }
    const regex = /^\d{10}$/;
    if (regex.exec(nationalCode) === null) {
      alert('کد ملی باید شامل اعداد انگلیسی و 10 رقم باشد!');
      return false;
    } else return true;
  }

  firstnameIsValid(firstname) {
    if (!firstname) {
      alert('نام نمیتواند خالی باشد!');
      return false;
    }
    const regex = /^[\u0600-\u06FF\s]+$/;
    if (regex.exec(firstname) === null) {
      alert('نام را با حروف فارسی وارد کنید!');
      return false;
    } else return true;
  }

  lastnameIsValid(lastname) {
    if (!lastname) {
      alert('نام خانوادگی نمیتواند خالی باشد!');
      return false;
    }
    const regex = /^[\u0600-\u06FF\s]+$/;
    if (regex.exec(lastname) === null) {
      alert('نام خانوادگی را با حروف فارسی وارد کنید!');
      return false;
    } else return true;
  }

  mobileIsValid(mobile) {
    if (!mobile) {
      alert('شماره موبایل نمیتواند خالی باشد!');
      return false;
    }
    if (!validator.isMobilePhone(mobile, 'fa-IR')) {
      alert('شماره موبایل را به صورت درست با اعداد انگلیسی وارد کنید!');
      return false;
    } else return true;
  }

  telephoneIsValid(tel) {
    if (!tel) {
      alert('شماره تلفن نمیتواند خالی باشد!');
      return false;
    }
    const regex = /^(\+98|0)\d{10}$/;
    if (regex.exec(tel) === null) {
      alert('شماره تلفن را به صورت درست با اعداد انگلیسی وارد کنید!');
    } else return true;
  }

  schoolFormValidator(code, title, boardOfTrust, isEnable) {
    if (!this.codeIsValid(code)) return false;
    if (!this.titleIsValid(title)) return false;
    if (!this.boardOfTrustIsValid(boardOfTrust)) return false;
    if (!this.isEnableIsValid(isEnable)) return false;
    else return true;
  }

  personnelFormValidator(nationalCode, code, firstname, lastname, mobile, tel) {
    if (!this.nationalCodeIsValid(nationalCode)) return false;
    if (!this.codeIsValid(code)) return false;
    if (!this.firstnameIsValid(firstname)) return false;
    if (!this.lastnameIsValid(lastname)) return false;
    if (!this.mobileIsValid(mobile)) return false;
    if (!this.telephoneIsValid(tel)) return false;
    else return true;
  }

  studentFormValidator(nationalCode, code, firstname, lastname, mobile, tel) {
    if (!this.nationalCodeIsValid(nationalCode)) return false;
    if (!this.codeIsValid(code)) return false;
    if (!this.firstnameIsValid(firstname)) return false;
    if (!this.lastnameIsValid(lastname)) return false;
    if (!this.mobileIsValid(mobile)) return false;
    if (!this.telephoneIsValid(tel)) return false;
    else return true;
  }
  parentFormValidator(nationalCode, code, firstname, lastname, mobile, tel) {
    if (!this.nationalCodeIsValid(nationalCode)) return false;
    if (!this.codeIsValid(code)) return false;
    if (!this.firstnameIsValid(firstname)) return false;
    if (!this.lastnameIsValid(lastname)) return false;
    if (!this.mobileIsValid(mobile)) return false;
    if (!this.telephoneIsValid(tel)) return false;
    else return true;
  }
}
