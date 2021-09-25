// @ts-ignore TS6133
import { expect } from "https://deno.land/x/expect@v0.2.6/mod.ts";
const test = Deno.test;

import { util } from "../helpers/util.ts";
import * as z from "../index.ts";

const booleanRecord = z.record(z.boolean());
type booleanRecord = z.infer<typeof booleanRecord>;

test("type inference", () => {
  const f1: util.AssertEqual<booleanRecord, Record<string, boolean>> = true;
  f1;
});

test("methods", () => {
  booleanRecord.optional();
  booleanRecord.nullable();
});

test("string record parse - pass", () => {
  booleanRecord.parse({
    k1: true,
    k2: false,
    1234: false,
  });
});

test("string record parse - fail", () => {
  const badCheck = () =>
    booleanRecord.parse({
      asdf: 1234,
    } as any);
  expect(badCheck).toThrow();

  expect(() => booleanRecord.parse("asdf")).toThrow();
});

test("string record parse - fail", () => {
  const badCheck = () =>
    booleanRecord.parse({
      asdf: {},
    } as any);
  expect(badCheck).toThrow();
});

test("string record parse - fail", () => {
  const badCheck = () =>
    booleanRecord.parse({
      asdf: [],
    } as any);
  expect(badCheck).toThrow();
});

test("record element", () => {
  expect(booleanRecord.element).toBeInstanceOf(z.ZodBoolean);
});
