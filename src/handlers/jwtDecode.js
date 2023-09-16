import VueJwtDecode from 'vue-jwt-decode'
export const jwtDecode = (() => {
    function getJwtDecodeRole(tokenObj) {
        try {
            const decoded = VueJwtDecode.decode(tokenObj);
            return decoded.role;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    return {
        returnGetJwtDecodeRole: getJwtDecodeRole,
    };
})();