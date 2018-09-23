import Component from "../framework/component";
export default class Project extends Component {
    private maxProjectName;
    private id;
    private name;
    constructor();
    /**
     * Устанавливает имя проекта
     *
     * @param name новое название
     */
    rename(name: string): void;
    getName(): string;
    getId(): number;
}
//# sourceMappingURL=project.d.ts.map