describe("storage", function () {
    beforeEach(function () {
        if ('sessionStorage' in window && typeof window.sessionStorage !== "undefined") {
            sessionStorage.clear();
        }
    });

    describe("Setting", function () {

        it(":storage sets primitives", function () {
            var number = 3;
            var string = "3 is three";

            storage.setItem("test1", number);
            storage.setItem("test2", string)

            expect(storage.getItem("test1")).toEqual(number);
            expect(storage.getItem("test2")).toEqual(string);
        });

        it(":storage sets object", function () {
            data = { number: 3 };
            storage.setItem("test", data);

            expect(storage.getItem("test")).toEqual(data);
        });

        it(":storage sets array", function () {
            data = [1, 2, 3];
            storage.setItem("test", data);

            expect(storage.getItem("test")).toEqual(data);
        });
    });

    describe("Getting", function () {
        it(":storage gets primitives", function () {
            var number = 3;
            var string = "3 is three";

            storage.setItem("test1", number);
            storage.setItem("test2", string)

            expect(storage.getItem("test1")).toEqual(number);
            expect(storage.getItem("test2")).toEqual(string);
        });

        it(":storage gets object", function () {
            data = { number: 3, character: 'a' };
            storage.setItem("test", data);

            expect(storage.getItem("test")).toEqual(jasmine.any(Object));
            expect(storage.getItem("test").number).toEqual(data.number);
            expect(storage.getItem("test").character).toEqual(data.character);
        });

        it(":storage gets array", function () {
            data = [1, '2', 3];
            storage.setItem("test", data);

            expect(storage.getItem("test")).toEqual(jasmine.any(Array));
            expect(storage.getItem("test")[0]).toEqual(data[0]);
            expect(storage.getItem("test")[1]).toEqual(data[1]);
            expect(storage.getItem("test")[2]).toEqual(data[2]);
        });
    });

    describe("Removing", function () {
        it(":storage removes item", function () {
            data = 3;

            storage.setItem("test", data);
            expect(storage.getItem("test")).toEqual(data);

            storage.removeItem("test");
            expect(storage.getItem("test")).toEqual(null);
        });
    });
});