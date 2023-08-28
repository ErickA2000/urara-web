import { ValidationErrors } from "@angular/forms";

export class CustomValidator{

    static validateTwoValues( valueOne: string, valueTwo: string ): ValidationErrors | null{
        if( valueOne === valueTwo ) return null;
        return { isDifferent: true };
    }

}