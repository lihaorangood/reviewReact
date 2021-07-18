export default function (...funcs) {
    return funcs.reduce((a,b) => (...args) => a(b(...args)))
}