// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const send = (status: number, data: any) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
};
