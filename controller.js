var response = require('./res');
var connection = require('./connection');
var pagination = require('pagination')


exports.users = function (req, res) {
    let data = {
        page: req.query.page,
        limit: req.query.limit,
        codeRPL: req.query.codeRPL,
        codeTKJ: req.query.codeTKJ,
        jumSisSel: req.query.jumSisSel,
        jumSisTer: req.query.jumSisTer,
        jumSisTkj: req.query.jumSisTkj,
        jumSisRpl: req.query.jumSisRpl
    }
    if (data.page === '') {
        data.page = 1;
    }

    if (data.limit === '') {
        data.limit = 2;
    }

    if (data.codeRPL === '' || data.codeTKJ === '' || data.jumSisSel === '' || data.jumSisTer === '' || data.jumSisTkj === '' || data.jumSisRpl === ''){
        response.gagalNIS(res);
    }
    let array = data.limit * (data.page - 1);
    let rpl,tkj;
    let string = []
    let string2 = []
    connection.query('SELECT COUNT(*) as totalCount FROM t_siswa', async function (error, rows, fields) {
        var paginator = new pagination.SearchPaginator({ prelink: '/', current: parseInt(data.page), rowsPerPage: parseInt(data.limit), totalResult: parseInt(rows[0].totalCount) });
        let config = paginator.getPaginationData();

        let configData = {
            startLimit: data.limit,
            offset: ((config.fromResult) - 1)
        };

        if (configData.offset <= 0) {
            configData.offset = 0;
        }
        await connection.query('SELECT * FROM t_siswa ORDER BY nama ASC', function (err, result) {
            let jumSel = data.jumSisSel;
            let jumTrk = data.jumSisTer;
            let jumRPl = data.jumSisRpl;
            let jumTKJ = data.jumSisTkj;
            let codeRpl = data.codeRPL;
            let codeTKJ = data.codeTKJ;
            result.map((item) => {

                if (item.id_jurusan == 'RPL') {
                    if (jumTrk < 9) {
                        if (jumRPl < 9) {
                            rpl = "000" + ++jumTrk + "/" + "000" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 9 && jumRPl < 99) {
                            rpl = "000" + ++jumTrk + "/" + "00" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 99 && jumRPl < 999) {
                            rpl = "000" + ++jumTrk + "/" + "0" + ++jumRPl + "." + codeRpl;                        
                        }
                        else if (jumRPl >= 999 && jumRPl < 99999) {
                            rpl = "000" + ++jumTrk + "/" + "" + ++jumRPl + "." + codeRpl;                        
                        }
                    }
                    else if (jumTrk >= 9 && jumTrk < 99) {
                        if (jumRPl < 9) {
                            rpl = "00" + ++jumTrk + "/" + "000" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 9 && jumRPl < 99) {
                            rpl = "00" + ++jumTrk + "/" + "00" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 99 && jumRPl < 999) {
                            rpl = "00" + ++jumTrk + "/" + "0" + ++jumRPl + "." + codeRpl;                        
                        }
                        else if (jumRPl >= 999 && jumRPl < 99999) {
                            rpl = "00" + ++jumTrk + "/" + "" + ++jumRPl + "." + codeRpl;                        
                        }
                    }
                    else if (jumTrk >= 99 && jumTrk < 999) {
                        if (jumRPl < 9) {
                            rpl = "0" + ++jumTrk + "/" + "000" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 9 && jumRPl < 99) {
                            rpl = "0" + ++jumTrk + "/" + "00" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 99 && jumRPl < 999) {
                            rpl = "0" + ++jumTrk + "/" + "0" + ++jumRPl + "." + codeRpl;                        
                        }
                        else if (jumRPl >= 999 && jumRPl < 99999) {
                            rpl = "0" + ++jumTrk + "/" + "" + ++jumRPl + "." + codeRpl;                        
                        }
                    }
                    else if (jumTrk >= 999) {
                        if (jumRPl < 9) {
                            rpl = ++jumTrk + "/" + "000" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 9 && jumRPl < 99) {
                            rpl = ++jumTrk + "/" + "00" + ++jumRPl + "." + codeRpl;
                        }
                        else if (jumRPl >= 99 && jumRPl < 999) {
                            rpl = ++jumTrk + "/" + "0" + ++jumRPl + "." + codeRpl;                        
                        }
                        else if (jumRPl >= 999 && jumRPl < 99999) {
                            rpl = ++jumTrk + "/" + "" + ++jumRPl + "." + codeRpl;                        
                        }
                    }
                    string.push(rpl);

                    connection.query("UPDATE t_siswa SET nis = '" + rpl + "' WHERE nama = '" + item.nama + "'", function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Success Post Data");
                        }
                    })
                }
                else if (item.id_jurusan == 'TKJ') {
                    if (jumTrk < 9) {
                        if (jumTKJ < 9) {
                            tkj = "000" + ++jumTrk + "/" + "000" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 9 && jumTKJ < 99) {
                            tkj = "000" + ++jumTrk + "/" + "00" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 99 && jumTKJ < 999) {
                            tkj = "000" + ++jumTrk + "/" + "0" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 999 && jumTKJ < 99999) {
                            tkj = "000" + ++jumTrk + "/" + ++jumTKJ + "." + codeTKJ;
                        }
                    }
                    else if (jumTrk >= 9 && jumTrk < 99) {
                        if (jumTKJ < 9) {
                            tkj = "00" + ++jumTrk + "/" + "000" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 9 && jumTKJ < 99) {
                            tkj = "00" + ++jumTrk + "/" + "00" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 99 && jumTKJ < 999) {
                            tkj = "00" + ++jumTrk + "/" + "0" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 999 && jumTKJ < 99999) {
                            tkj = "00" + ++jumTrk + "/" + ++jumTKJ + "." + codeTKJ;
                        }
                    }
                    else if (jumTrk >= 99 && jumTrk < 999) {
                        if (jumTKJ < 9) {
                            tkj = "0" + ++jumTrk + "/" + "000" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 9 && jumTKJ < 99) {
                            tkj = "0" + ++jumTrk + "/" + "00" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 99 && jumTKJ < 999) {
                            tkj = "0" + ++jumTrk + "/" + "0" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 999 && jumTKJ < 99999) {
                            tkj = "0" + ++jumTrk + "/" + ++jumTKJ + "." + codeTKJ;
                        }
                    }
                    else if (jumTrk >= 999) {
                        if (jumTKJ < 9) {
                            tkj = ++jumTrk + "/" + "000" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 9 && jumTKJ < 99) {
                            tkj = ++jumTrk + "/" + "00" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 99 && jumTKJ < 999) {
                            tkj = ++jumTrk + "/" + "0" + ++jumTKJ + "." + codeTKJ;
                        }
                        else if (jumTKJ >= 999 && jumTKJ < 99999) {
                            tkj = ++jumTrk + "/" + ++jumTKJ + "." + codeTKJ;
                        }
                    }
                    string.push(tkj);

                    connection.query("UPDATE t_siswa SET nis = '" + tkj + "' WHERE nama = '" + item.nama + "'", function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Success Post Data");
                        }
                    })
                }

            })

        })

        connection.query('SELECT * FROM t_siswa ORDER BY nama ASC LIMIT ' + data.limit + ' OFFSET ' + data.limit * (data.page - 1), function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                rows.map((item) => {

                    let i = {
                        "nis": item.nis,
                        "nama": item.nama,
                        "kelamin": item.jk,
                        "jurusan": item.id_jurusan,
                        "angkatan": item.angkatan
                    }
                    string2.push(i);
                });
                let paginationConfig = {
                    prelink: '/',
                    current: config.current,
                    previous: config.previous,
                    next: config.next,
                    first: config.first,
                    last: config.last,
                    range: config.range,
                    fromResult: config.fromResult,
                    toResult: config.toResult,
                    totalResult: config.totalResult,
                    pageCount: config.pageCount
                };
                response.ok(string2, paginationConfig, res)
            }
        });
    })

};

exports.login = function (req, res){
    let data = {
        email : req.body.email,
        password : req.body.password
    }
    
    connection.query("SELECT COUNT(*) as totalCount FROM auth_siswa WHERE email = '"+data.email+"' AND password = '"+data.password+"'",function(err,rows,fields){
        let count = 0;
        if(err){
            console.log(err);
        }else{
                if(rows[0].totalCount > 0){
                    count++
                    response.login(count,res);
                }
                else{
                    response.gagal(count,res);
                }
                
        }
    });
}

exports.index = function (req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
