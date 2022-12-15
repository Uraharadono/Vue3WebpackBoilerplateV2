// Example here: https://stackoverflow.com/a/63727038/4267429
// THere is also this: https://stackoverflow.com/a/61177479
import { helpers as vuelidateHelpers } from "@vuelidate/validators";

export const oneUppercase = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }
    const match = value.match(/[A-Z]/g) || [];
    return match.length >= 1;
};
export const oneLowercase = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }
    const match = value.match(/[a-z]/g) || [];
    return match.length >= 1;
};
export const oneSpecial = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }
    const match = value.match(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g) || [];
    return match.length >= 1;
};
export const oneNumber = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }
    const match = value.match(/\d/g) || [];
    return match.length >= 1;
};

export const require6UniqueChars  = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }

    // return true; // If below fails, just revert this

    // Found here: https://stackoverflow.com/a/20468042/4267429
    const match = value.match(/(?:(.)(?!.*?\1).*){6}/) || [];
    return match.length >= 1;
}
