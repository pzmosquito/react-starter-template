// @flow
export default {
    home: {
        loginRequired: true,
        loader({ loadData, done }: DataLoader) {
            loadData()
                .then(() => {
                    done();
                })
                .catch(() => {
                    // handle
                });
        },
    },
};
