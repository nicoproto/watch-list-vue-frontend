export default {
  async loadLists(context) {
    const response = await fetch("http://localhost:3000/api/v1/lists");

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch lists!");
      throw error;
    }

    const lists = [];

    for (const key in responseData) {
      const list = {
        id: responseData[key].id,
        name: responseData[key].name,
      };

      lists.push(list);
    }
    context.commit("setLists", lists);
  },
  async loadList(context, payload) {
    const response = await fetch(
      `http://localhost:3000/api/v1/lists/${payload.id}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch movie");
      throw error;
    }

    context.commit("setList", responseData);
  },
  async destroyList(context, payload) {
    const response = await fetch(
      `http://localhost:3000/api/v1/lists/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to destroy list!"
      );
      throw error;
    }

    context.commit("destroyList", {
      id: payload.id,
    });
  },
  async registerList(context, payload) {
    const listData = payload;

    const response = await fetch("http://localhost:3000/api/v1/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ list: listData }),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.message) {
      const error = new Error(
        responseData.message || "Failed to create movie!"
      );
      throw error;
    }

    context.commit("registerList", {
      ...listData,
      id: responseData.id,
    });

    return responseData;
  },
  async updateList(context, payload) {
    const listData = payload;

    const response = await fetch(
      `http://localhost:3000/api/v1/lists/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: listData,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to update list!");
      throw error;
    }

    context.commit("updateList", {
      ...listData,
      id: payload.id,
    });
  },
};
