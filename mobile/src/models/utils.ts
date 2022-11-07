export type WithCount<T, K extends string> = T & {
  _count: {
    [key in K]: number
  }
}