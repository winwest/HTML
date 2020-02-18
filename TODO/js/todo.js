$(function() {
    // 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入内容");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);
                //本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    //删除
    $("ol,ul").on("click", "a", function() {
        var data = getDate();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveDate(data);
        load();
    });

    //复选框勾选操作
    $("ol,ul").on("click", "input", function() {
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    })

    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        var todoCount = 0;
        var doneCount = 0;
        // 读取本地存储的数据
        var data = getDate();
        //遍历之前清空ol原来的内容
        $("ol, ul").empty();

        // 遍历之前先要清空ol里面的元素内容
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})