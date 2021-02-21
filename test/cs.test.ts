import { generate } from '../src';

const css = (_values: { color?: string; fontSize?: number }) => 'custom';
const cs = generate(css);

describe('cs core', () => {
    it('works with a single string', () => {
        expect(cs('foo')).toEqual('foo');
    });

    it('works with a single style object', () => {
        expect(cs({ color: 'red' })).toEqual('custom');
    });

    it('filters out falsy values', () => {
        expect(cs(false, 'bar')).toEqual('bar');
        expect(cs('foo', null)).toEqual('foo');
        expect(cs('foo', undefined)).toEqual('foo');
    });

    it('works with nested values', () => {
        expect(cs(['foo', 'bar'])).toEqual('foo bar');
        expect(cs([false, 'bar'])).toEqual('bar');
        expect(cs([false, 'bar'], ['foo', null])).toEqual('bar foo');
        expect(cs([false, 'bar', ['baz']], ['foo', null])).toEqual(
            'bar baz foo'
        );
    });

    it('works with style objects', () => {
        expect(cs({ color: 'red', fontSize: 14 }, 'bar')).toEqual('custom bar');
        expect(cs([{ color: 'red', fontSize: 14 }, 'bar'])).toEqual(
            'custom bar'
        );
    });
});

describe('cs design decisions', () => {
    it('filters out blank strings', () => {
        expect(cs(['foo', '', 'bar'])).toEqual('foo bar');
    });

    it('does not de-dupe', () => {
        expect(cs(['foo', 'bar', 'foo'])).toEqual('foo bar foo');
    });
});
