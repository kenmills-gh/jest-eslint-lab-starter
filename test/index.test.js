const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('Utility Functions', () => {
    // ==========================================
    // 1. capitalizeWords(input) Tests
    // ==========================================
    describe('capitalizeWords', () => {
    // Normal cases
        test('should capitalize the first letter of each word in a standard string', () => {
            expect(capitalizeWords('hello world')).toBe('Hello World');
        });

        test('should handle single-word strings', () => {
            expect(capitalizeWords('javascript')).toBe('Javascript');
        });

        // Edge cases
        test('should return an empty string when given an empty string', () => {
            expect(capitalizeWords('')).toBe('');
        });

        test('should handle strings with special characters', () => {
            expect(capitalizeWords('hello-world')).toBe('Hello-World');
            expect(capitalizeWords('apple, banana')).toBe('Apple, Banana');
        });
    });

    // ==========================================
    // 2. filterActiveUsers(users) Tests
    // ==========================================
    describe('filterActiveUsers', () => {
        const activeUser = { id: 1, name: 'Alice', isActive: true };
        const inactiveUser = { id: 2, name: 'Bob', isActive: false };

        test('should correctly filter active users from an array of mixed users', () => {
            const mixedUsers = [
                activeUser,
                inactiveUser,
                { id: 3, name: 'Charlie', isActive: true },
            ];
            const result = filterActiveUsers(mixedUsers);

            expect(result).toHaveLength(2);
            expect(result).toContainEqual(activeUser);
            expect(result).not.toContainEqual(inactiveUser);
        });

        test('should return an empty array if all users are inactive', () => {
            const inactiveUsers = [
                inactiveUser,
                { id: 3, name: 'Charlie', isActive: false },
            ];
            expect(filterActiveUsers(inactiveUsers)).toEqual([]);
        });

        test('should return an empty array when given an empty array', () => {
            expect(filterActiveUsers([])).toEqual([]);
        });
    });

    // ==========================================
    // 3. logAction(action, username) Tests
    // ==========================================
    describe('logAction', () => {
    // Normal Case (using regex to account for the dynamic timestamp)
        test('should generate the correct log string for valid inputs', () => {
            const action = 'LOGIN';
            const username = 'JohnDoe';
            const result = logAction(action, username);

            // Matches 'User JohnDoe performed LOGIN at ' followed by an ISO timestamp pattern
            const isoTimestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
            expect(result).toMatch(
                new RegExp(
                    `^User ${username} performed ${action} at ${isoTimestampRegex.source}$`,
                ),
            );
        });

        // Edge Cases
        test('should handle empty strings as inputs', () => {
            const result = logAction('', '');
            expect(result).toMatch(/^User {2}performed {2}at/);
        });

        test('should handle missing action or username (undefined/null)', () => {
            // Testing behavior when parameters are omitted
            const resultMissingUser = logAction('LOGOUT');
            expect(resultMissingUser).toMatch(/User undefined performed LOGOUT at/);

            const resultMissingBoth = logAction();
            expect(resultMissingBoth).toMatch(
                /User undefined performed undefined at/,
            );
        });
    });
});
