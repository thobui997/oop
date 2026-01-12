/**
 * Single Responsibility:
 *  Một Class chỉ nên có một lý do duy nhất để thay đổi.
 *  Tức là nó chỉ nên làm một việc duy nhất.
 */

class ReportService {
    constructor(public title: string, public content: string) { }

    getData() {
        return { title: this.title, content: this.content }
    }
}

class ReportFormatter {
    constructor(private reportService: ReportService) { }

    formatJSON() {
        return JSON.stringify(this.reportService.getData());
    }
}