export function recursiveFibanocci(num){
    if(num <= 1){
        return 1;
    }
    return recursiveFibanocci(num - 1) + recursiveFibanocci(num - 2);
}